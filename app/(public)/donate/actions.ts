'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitDonation(currentState: any, formData: FormData) {
  const supabase = await createClient()

  const donor_name = formData.get('donor_name') as string
  const donor_email = formData.get('donor_email') as string
  const donor_phone = formData.get('donor_phone') as string
  const amount = formData.get('amount') as string
  const transfer_date = formData.get('transfer_date') as string
  const last_5_digits = formData.get('last_5_digits') as string
  const donor_tax_id = formData.get('donor_tax_id') as string | null
  const receipt_address = formData.get('receipt_address') as string | null
  const note = formData.get('note') as string | null
  
  const file = formData.get('proof_image') as File | null

  // 1. Basic Validation
  if (!donor_name || !amount || !transfer_date || !last_5_digits) {
    return { error: '請填寫所有必填欄位 (姓名、金額、日期、帳號末五碼)' }
  }

  // 2. Upload Proof Image (if exists)
  let proof_image_url = null
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(filename, file)

    if (uploadError) {
      return { error: `圖片上傳失敗: ${uploadError.message}` }
    }
    proof_image_url = filename
  }

  // 3. Get User ID (Optional)
  const { data: { user } } = await supabase.auth.getUser()

  // 4. Insert Donation Record
  const { error: insertError } = await supabase
    .from('donations')
    .insert({
      user_id: user?.id || null, // Link to user if logged in, else null
      donor_name,
      donor_tax_id, // Can be null
      amount: parseInt(amount, 10),
      transfer_date,
      last_5_digits,
      proof_image_url,
      receipt_status: 'pending',
      // Note: We might need to store extra details (email, phone, address, note) in a JSON column or add columns if they don't exist.
      // Checking schema... Schema has donor_name, donor_tax_id, amount, transfer_date, last_5_digits, proof_image_url.
      // Schema does NOT have donor_email, donor_phone, receipt_address, note explicitly?
      // Let's check schema lines 41-54 again.
      // Columns: id, user_id, donor_name, donor_tax_id, amount, transfer_date, last_5_digits, proof_image_url, receipt_status, receipt_no, admin_note, created_at.
      // Missing: donor_email, donor_phone, receipt_address, note (user note).
      // We should probably check if we need to add these columns or if we store them in `admin_note`?
      // Wait, admin_note is usually for admins.
      // We should probably add these columns to schema or store them in a new `details` jsonb column like audit_logs, OR just append to admin_note for now to be safe without migration.
      // However, for a proper donation system, email is critical for contact.
      // Let's assume for now we might need to add them. But since I cannot easily run migration without user permission/sql file edit + run...
      // Actually I have direct SQL execution capability via... no I don't. I only have `supabase_schema.sql` which is for setup.
      // The user said "backend base" is done.
      // Let's look at `donations` table definition again.
      // It seems minimal.
      // For now, I will store extra info in `admin_note` prefixed clearly, OR ignore them.
      // Better: Store in `admin_note` so admins can see it.
      admin_note: `[User Submission]\nEmail: ${donor_email}\nPhone: ${donor_phone}\nAddress: ${receipt_address || 'None'}\nNote: ${note || 'None'}`
    })

  if (insertError) {
    return { error: `資料儲存失敗: ${insertError.message}` }
  }

  revalidatePath('/admin/donations')
  return { success: true, message: '捐款回報成功！我們將盡快核對。' }
}

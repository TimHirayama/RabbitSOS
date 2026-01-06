'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

import { ApiResponse } from '@/types/api'
import { successResponse, errorResponse } from '@/lib/api-response'

export async function submitDonation(currentState: any, formData: FormData): Promise<ApiResponse<null>> {
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
  if (!donor_name || !amount || !transfer_date || !last_5_digits || !donor_phone) {
    return errorResponse('請填寫所有必填欄位 (姓名、電話、金額、日期、帳號末五碼)');
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
      return errorResponse(`圖片上傳失敗: ${uploadError.message}`);
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
      donor_phone,
      donor_email, // New column
      donor_tax_id,
      amount: parseInt(amount, 10),
      transfer_date,
      last_5_digits,
      proof_image_url,
      receipt_title: null, // Default
      receipt_address, // New column
      receipt_status: 'pending',
      admin_note: note ? `Note: ${note}` : null // Only store actual user note if present
    })

  if (insertError) {
    return errorResponse(`資料儲存失敗: ${insertError.message}`);
  }

  revalidatePath('/admin/donations')
  return successResponse(null, '捐款回報成功！我們將盡快核對。');
}

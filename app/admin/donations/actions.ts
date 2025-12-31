'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function verifyDonation(id: string) {
  const supabase = await createClient()

  // Generate Receipt No (Simple logic: YEAR-MONTH-RANDOM)
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  const receipt_no = `R${year}${month}-${random}`

  const { error } = await supabase.from('donations').update({
    receipt_status: 'verified',
    receipt_no: receipt_no
  }).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/donations')
  return { success: true }
}

export async function rejectDonation(id: string, note: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('donations').update({
    receipt_status: 'issue',
    admin_note: note
  }).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/donations')
  return { success: true }
}

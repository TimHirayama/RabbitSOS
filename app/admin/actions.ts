'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { logAdminAction } from '@/lib/audit-logger'

export async function getSiteSetting(key: string, defaultValue: string = '') {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()
  
  return data?.value || defaultValue
}

export async function updateSiteSetting(key: string, value: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() })

  if (error) return { error: error.message }

  await logAdminAction('UPDATE_SETTING', key, { value })
  revalidatePath('/', 'layout') // Revalidate everything just in case
  return { success: true }
}

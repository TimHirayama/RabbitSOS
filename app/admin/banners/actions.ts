'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { logAdminAction } from '@/lib/audit-logger'

export async function uploadBanner(formData: FormData) {
  const supabase = await createClient()

  const file = formData.get('file') as File
  const title = formData.get('title') as string
  const link_url = formData.get('link_url') as string
  const display_mode = (formData.get('display_mode') as string) || 'contained'

  if (!file) return { error: 'No file uploaded' }

  // 1. Upload to Storage
  // Sanitize filename to avoid issues with Chinese characters
  const fileExt = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('banners')
    .upload(filename, file)

  if (uploadError) return { error: uploadError.message }

  // 2. Get next sort order
  const { count } = await supabase.from('banners').select('*', { count: 'exact', head: true })
  const nextOrder = (count || 0) + 1

  // 3. Insert into DB
  const { data: banner, error: dbError } = await supabase.from('banners').insert({
    title,
    link_url,
    image_path: filename,
    display_mode,
    sort_order: nextOrder,
    is_active: true
  }).select().single()

  if (dbError) return { error: dbError.message }

  await logAdminAction('CREATE_BANNER', `banner_${banner.id}`, { title, display_mode })
  revalidatePath('/admin/banners')
  revalidatePath('/') // Update homepage
  return { success: true }
}

export async function toggleBannerStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient()

  const { error } = await supabase.from('banners')
    .update({ is_active: !currentStatus })
    .eq('id', id)

  if (error) return { error: error.message }

  await logAdminAction('UPDATE_BANNER', `banner_${id}`, { is_active: !currentStatus })
  revalidatePath('/admin/banners')
  revalidatePath('/')
  return { success: true }
}

export async function toggleBannerMode(id: string, currentMode: string) {
  const supabase = await createClient()
  const newMode = currentMode === 'full' ? 'contained' : 'full'

  const { error } = await supabase.from('banners')
    .update({ display_mode: newMode })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/banners')
  revalidatePath('/')
  return { success: true }
}

export async function deleteBanner(id: string, imagePath: string) {
  const supabase = await createClient()

  // 1. Delete from Storage
  const { error: storageError } = await supabase.storage
    .from('banners')
    .remove([imagePath])

  if (storageError) console.error('Storage delete failed:', storageError)

  // 2. Delete from DB
  const { error: dbError } = await supabase.from('banners')
    .delete()
    .eq('id', id)

  if (dbError) return { error: dbError.message }

  await logAdminAction('DELETE_BANNER', `banner_${id}`)
  revalidatePath('/admin/banners')
  revalidatePath('/')
  return { success: true }
}

export async function updateBannerOrder(id: string, newOrder: number) {
    const supabase = await createClient()
    const { error } = await supabase.from('banners')
        .update({ sort_order: newOrder })
        .eq('id', id)
    
    if (error) return { error: error.message }
    
    revalidatePath('/admin/banners')
    revalidatePath('/')
    return { success: true }
}

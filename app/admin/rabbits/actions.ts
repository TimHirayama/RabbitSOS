'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { logAdminAction } from '@/lib/audit-logger'

export async function createRabbit(formData: FormData) {
  const supabase = await createClient()

  // Extract data
  const name = formData.get('name') as string
  const status = formData.get('status') as string
  const gender = formData.get('gender') as string
  const age_year = formData.get('age_year') ? parseInt(formData.get('age_year') as string) : null
  const location = formData.get('location') as string
  const description = formData.get('description') as string
  const image_urls = formData.getAll('image_urls') as string[] 
  // Note: For array input from form, we might handle it differently in client, 
  // but let's assume client sends multiple inputs or a JSON string.
  // Actually, standard FormData getAll works if multiple inputs have same name.

  const { data, error } = await supabase.from('rabbits').insert({
    name,
    status,
    gender,
    age_year,
    location,
    description,
    image_urls,
  }).select().single()

  if (error) {
    return { error: error.message }
  }
  
  await logAdminAction('CREATE_RABBIT', `rabbit_${data.id}`, { name, status })

  revalidatePath('/admin/rabbits')
  redirect('/admin/rabbits')
}

export async function updateRabbit(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const status = formData.get('status') as string
  const gender = formData.get('gender') as string
  const age_year = formData.get('age_year') ? parseInt(formData.get('age_year') as string) : null
  const location = formData.get('location') as string
  const description = formData.get('description') as string
  const image_urls = formData.getAll('image_urls') as string[]

  const { error } = await supabase.from('rabbits').update({
    name,
    status,
    gender,
    age_year,
    location,
    description,
    image_urls,
  }).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  await logAdminAction('UPDATE_RABBIT', `rabbit_${id}`, { name, status })

  revalidatePath('/admin/rabbits')
  revalidatePath(`/admin/rabbits/${id}`)
  redirect('/admin/rabbits')
}

export async function deleteRabbit(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('rabbits').delete().eq('id', id)
  
  if (error) {
     return { error: error.message }
  }

  await logAdminAction('DELETE_RABBIT', `rabbit_${id}`)
  
  revalidatePath('/admin/rabbits')
}

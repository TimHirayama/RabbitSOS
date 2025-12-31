'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createVolunteer(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  const supabase = createAdminClient()

  // 1. Create Auth User
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName
    }
  })

  if (userError) {
    console.error('Error creating user:', userError)
    return { error: userError.message }
  }

  if (!userData.user) {
    return { error: 'Failed to create user' }
  }

  // 2. Update Profile Role (Trigger creates profile, but defaults to 'user', we need 'volunteer')
  // We can update the profile directly.
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'volunteer' })
    .eq('id', userData.user.id)

  if (profileError) {
    console.error('Error updating profile role:', profileError)
    return { error: 'User created but failed to set volunteer role' }
  }

  revalidatePath('/admin/users')
  return { success: true }
}

export async function deleteUser(userId: string) {
  const supabase = createAdminClient()
  
  const { error } = await supabase.auth.admin.deleteUser(userId)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin/users')
  return { success: true }
}

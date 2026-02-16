'use server'

import { createClient } from '@/lib/supabase/server'

export async function getUsers() {
  const supabase = await createClient()

  // Fetch profiles with emails
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role')
    .order('email', { ascending: true })

  if (error) {
    console.error('Error fetching users:', error)
    return []
  }

  return data
}

export async function getLeadInteractions(leadId: number) {
  const supabase = await createClient()

  // 1. Fetch interactions with user_id instead of joining, to avoid FK issues
  const { data: interactions, error } = await supabase
    .from('lead_interactions')
    .select(`
      id,
      interaction_type,
      notes,
      created_at,
      user_id
    `)
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching interactions:', error)
    return []
  }

  if (!interactions || interactions.length === 0) {
    return []
  }

  // 2. Extract unique user IDs
  const userIds = Array.from(new Set(interactions.map(i => i.user_id).filter(Boolean)))

  // 3. Fetch profiles manually
  let profilesMap: Record<string, { email: string }> = {}

  if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds)

      if (profiles) {
          profiles.forEach(p => {
              profilesMap[p.id] = p
          })
      }
  }

  // 4. Combine data
  const enrichedInteractions = interactions.map(interaction => ({
      ...interaction,
      user: profilesMap[interaction.user_id] || { email: 'Usuário Desconhecido' }
  }))

  return enrichedInteractions
}

export async function addInteraction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const leadId = formData.get('lead_id')
  const userId = formData.get('user_id')
  const interactionType = formData.get('interaction_type')
  const notes = formData.get('notes')

  if (!leadId || !userId || !interactionType) {
    return { error: 'Campos obrigatórios faltando' }
  }

  const { error } = await supabase
    .from('lead_interactions')
    .insert({
      lead_id: leadId,
      user_id: userId,
      interaction_type: interactionType,
      notes: notes
    })

  if (error) {
    console.error('Error adding interaction:', error)
    return { error: 'Erro ao registrar atendimento' }
  }

  return { success: true }
}

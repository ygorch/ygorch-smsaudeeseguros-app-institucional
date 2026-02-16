'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitLead(token: string, formData: FormData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const interest = formData.get("interest");
  const message = formData.get("message");

  if (!name || typeof name !== 'string' ||
      !phone || typeof phone !== 'string' ||
      !email || typeof email !== 'string') {
    return { error: 'Nome, telefone e e-mail são campos obrigatórios.' };
  }

  if ((interest && typeof interest !== 'string') || (message && typeof message !== 'string')) {
    return { error: 'Dados de interesse ou mensagem inválidos.' };
  }

  // 1. Verify reCAPTCHA
  // Use a placeholder secret if not provided in env, for development/testing
  // In production, this MUST be set.
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' // Google Test Secret

  if (!token) {
      return { error: 'Validação de segurança não encontrada.' }
  }

  try {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${token}`
      })

      const verifyData = await verifyRes.json()

      // reCAPTCHA v3 returns a score (0.0 to 1.0)
      // verifyData.success might be true even with low score, check score.
      // Default threshold 0.5
      if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
         console.warn('reCAPTCHA validation failed:', verifyData)
         return { error: 'Não foi possível validar seu envio. Tente novamente.' }
      }
  } catch (err) {
      console.error('reCAPTCHA verification error:', err)
      return { error: 'Erro na verificação de segurança.' }
  }

  // 2. Insert into Supabase
  const supabase = await createClient()

  const { error } = await supabase.from('leads').insert([{
      name,
      phone,
      email,
      interest,
      message
  }])

  if (error) {
      console.error('Error inserting lead:', error)
      return { error: 'Ocorreu um erro ao salvar suas informações.' }
  }

  return { success: true }
}

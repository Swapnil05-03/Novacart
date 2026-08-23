import { supabase } from '@/lib/supabaseClient'

export const authService = {
  async signUp({ email, password, fullName }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    if (error) throw error
    return data
  },

  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async sendPasswordReset(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  },

  async updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  },

  /**
   * Re-authenticates with the current password before a sensitive change.
   * Supabase's updateUser() doesn't require the current password itself,
   * so we verify it client-side first for a safer UX.
   */
  async verifyCurrentPassword(email, currentPassword) {
    const { error } = await supabase.auth.signInWithPassword({ email, password: currentPassword })
    if (error) throw new Error('Current password is incorrect')
  },

  /** Signs out every session except the one currently in use. */
  async signOutOtherDevices() {
    const { error } = await supabase.auth.signOut({ scope: 'others' })
    if (error) throw error
  },

  // --- Two-factor authentication (TOTP via Supabase MFA) -------------------

  async listMfaFactors() {
    const { data, error } = await supabase.auth.mfa.listFactors()
    if (error) throw error
    return data.totp || []
  },

  async enrollMfa() {
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' })
    if (error) throw error
    return data
  },

  async verifyMfaEnrollment(factorId, code) {
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId })
    if (challengeError) throw challengeError
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code,
    })
    if (verifyError) throw verifyError
  },

  async unenrollMfa(factorId) {
    const { error } = await supabase.auth.mfa.unenroll({ factorId })
    if (error) throw error
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },
}
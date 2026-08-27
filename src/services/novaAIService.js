// Frontend client for Nova AI. This never talks to the AI provider
// directly — it only calls NovaCart's own /api/nova-ai serverless
// endpoint, which holds the real API key server-side (see api/nova-ai.js).

const ENDPOINT = '/api/nova-ai'

export const novaAIService = {
  /**
   * @param {string} message - the shopper's message
   * @param {{role: 'user'|'assistant', content: string}[]} history - recent turns, for follow-up context ("which one has better battery?")
   * @returns {Promise<{message: string, products: {id: string, reason: string}[], suggestions: string[]}>}
   */
  async sendMessage(message, history = []) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    })

    if (!res.ok) {
      throw new Error(`nova_ai_request_failed_${res.status}`)
    }

    const data = await res.json()
    return {
      message: data.message || "Sorry, I'm having trouble right now. Please try again.",
      products: Array.isArray(data.products) ? data.products : [],
      suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
    }
  },
}

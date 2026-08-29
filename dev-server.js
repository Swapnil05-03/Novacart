// dev-server.js
//
// LOCAL DEVELOPMENT ONLY. Runs api/nova-ai.js as a plain Express route so
// you don't need `vercel dev` (which has been unreliable on this machine).
// Vite's proxy (see vite.config.js) forwards /api/* here on port 3001.
//
// This file is never used in production — Vercel serves api/nova-ai.js
// as a serverless function on its own, using its own routing.
//
// Run with:  node dev-server.js   (in one terminal)
// Then:      npm run dev          (in another terminal)

import express from 'express'
import handler from './api/nova-ai.js'

const app = express()
app.use(express.json())

app.post('/api/nova-ai', (req, res) => {
  handler(req, res)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Nova AI dev server running on http://localhost:${PORT}`)
})
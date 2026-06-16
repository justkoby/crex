import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const isValidUrl = (url) => {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

let supabaseClient = null

if (isValidUrl(supabaseUrl)) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey || '')
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
  }
} else {
  console.warn(
    'Warning: Supabase client could not be initialized because VITE_SUPABASE_URL is missing, invalid, or a placeholder. Form submissions will fail.'
  )
}

export const supabase = supabaseClient || new Proxy({}, {
  get(target, prop) {
    return () => {
      throw new Error(
        `Supabase client is not initialized. Please verify that VITE_SUPABASE_URL is set to a valid HTTP/HTTPS URL in your .env.local file.`
      )
    }
  }
})

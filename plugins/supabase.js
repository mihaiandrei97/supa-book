import { createClient } from '@supabase/supabase-js'

export default ({ app }, inject) => {
  const supabase = createClient(process.env.NUXT_ENV_SUPABASE_URL, process.env.NUXT_ENV_SUPABASE_KEY)

  inject('supabase', supabase)
}
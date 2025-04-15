import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './types'

export function useSupabase() {
  return createClientComponentClient<Database>()
} 
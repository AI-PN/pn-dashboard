import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type Patient = {
  id: string
  name: string
  age: number
  status: 'Active' | 'Pending' | 'Stable'
  image_url: string | null
  last_visit: string
  created_at: string
}

export type Task = {
  id: string
  title: string
  time: string
  priority: 'High' | 'Medium' | 'Low'
  patient_id: string
  status: 'Pending' | 'Completed'
  created_at: string
  patient?: {
    name: string
    image_url: string
  }
}

export type Message = {
  id: string
  content: string
  patient_id: string
  sender_id: string
  sender_type: 'doctor' | 'patient'
  is_read: boolean
  created_at: string
  sender?: {
    id: string
    full_name: string
    avatar_url: string | null
  }
}

// API functions for patients
export async function getPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getPatientById(id: string) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createPatient(patient: Omit<Patient, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating patient:', error)
    throw error
  }
}

// API functions for tasks
export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      patient:patients(name, image_url)
    `)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getTasksByPatient(patientId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      patient:patients(name, image_url)
    `)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'patient'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select(`
      *,
      patient:patients(name, image_url)
    `)
  
  if (error) throw error
  return data[0]
}

// API functions for messages
export async function getMessages(patientId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles(id, full_name, avatar_url)
    `)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: true })
  
  if (error) throw error
  return data as Message[]
}

export async function sendMessage(message: Omit<Message, 'id' | 'created_at' | 'sender'>) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      ...message,
      is_read: false,
      sender_type: 'doctor'
    }])
    .select(`
      *,
      sender:profiles(id, full_name, avatar_url)
    `)
    .single()
  
  if (error) throw error
  return data as Message
}

export async function markMessageAsRead(messageId: string) {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', messageId)
  
  if (error) throw error
} 
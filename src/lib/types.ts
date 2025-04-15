export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          name: string
          age: number
          status: 'Active' | 'Pending' | 'Inactive'
          image_url: string | null
          last_visit: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          age: number
          status: 'Active' | 'Pending' | 'Inactive'
          image_url?: string | null
          last_visit: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number
          status?: 'Active' | 'Pending' | 'Inactive'
          image_url?: string | null
          last_visit?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          content: string
          patient_id: string
          sender_id: string
          sender_type: 'doctor' | 'patient'
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          patient_id: string
          sender_id: string
          sender_type: 'doctor' | 'patient'
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          patient_id?: string
          sender_id?: string
          sender_type?: 'doctor' | 'patient'
          is_read?: boolean
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
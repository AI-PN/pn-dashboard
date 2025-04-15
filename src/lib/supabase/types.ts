export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string
          patient_id: string
          sender_id: string
          content: string
          created_at: string
          is_read: boolean
        }
        Insert: {
          id?: string
          patient_id: string
          sender_id: string
          content: string
          created_at?: string
          is_read?: boolean
        }
        Update: {
          id?: string
          patient_id?: string
          sender_id?: string
          content?: string
          created_at?: string
          is_read?: boolean
        }
      }
      patients: {
        Row: {
          id: string
          name: string
          age: number
          status: 'Active' | 'Pending' | 'Stable'
          last_visit: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          age: number
          status: 'Active' | 'Pending' | 'Stable'
          last_visit: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number
          status?: 'Active' | 'Pending' | 'Stable'
          last_visit?: string
          image_url?: string
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
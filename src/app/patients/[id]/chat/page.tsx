'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Send, ArrowLeft, Phone, Video } from 'lucide-react'
import { getMessages, sendMessage, markMessageAsRead, type Message } from '@/lib/supabase'
import { useSupabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export default function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const router = useRouter()
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useSupabase()
  const [patientId, setPatientId] = useState<string>('')

  useEffect(() => {
    Promise.all([params, searchParams]).then(([{ id }]) => setPatientId(id))
  }, [params, searchParams])

  useEffect(() => {
    if (!patientId) return

    async function loadMessages() {
      try {
        const data = await getMessages(patientId)
        setMessages(data)
        
        // Mark unread messages as read
        const unreadMessages = data.filter(m => !m.is_read)
        await Promise.all(unreadMessages.map(m => markMessageAsRead(m.id)))
      } catch (error) {
        console.error('Error loading messages:', error)
        toast.error('Failed to load messages')
      } finally {
        setLoading(false)
      }
    }

    loadMessages()

    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `patient_id=eq.${patientId}`,
        },
        (payload: RealtimePostgresChangesPayload<Message>) => {
          const newMessage = payload.new
          if (
            newMessage &&
            typeof newMessage === 'object' &&
            'id' in newMessage &&
            'content' in newMessage &&
            'patient_id' in newMessage &&
            'sender_id' in newMessage &&
            'sender_type' in newMessage &&
            'is_read' in newMessage &&
            'created_at' in newMessage
          ) {
            setMessages(prev => [...prev, {
              id: String(newMessage.id),
              content: String(newMessage.content),
              patient_id: String(newMessage.patient_id),
              sender_id: String(newMessage.sender_id),
              sender_type: newMessage.sender_type as 'doctor' | 'patient',
              is_read: Boolean(newMessage.is_read),
              created_at: String(newMessage.created_at),
              sender: undefined
            }])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [patientId, supabase])

  const handleBack = () => {
    router.push(`/patients/${patientId}`)
  }

  const handleSend = async () => {
    if (!messageInput.trim()) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      await sendMessage({
        patient_id: patientId,
        sender_id: user.id,
        content: messageInput.trim(),
        is_read: false,
        sender_type: 'doctor'
      })
      setMessageInput('')
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
    }
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-lg">Loading messages...</div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/dr-wilson.jpg" alt="Dr. Sarah Wilson" />
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">Dr. Sarah Wilson</h1>
            <p className="text-sm text-gray-500">Primary Care Physician</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-4 flex items-start gap-3">
            <Avatar>
              <AvatarImage src={message.sender?.avatar_url || undefined} alt={message.sender?.full_name || ''} />
              <AvatarFallback>
                {message.sender?.full_name?.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{message.sender?.full_name}</p>
              <p className="text-gray-600">{message.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(message.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend()
              }
            }}
          />
          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
} 
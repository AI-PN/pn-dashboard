'use client'

import { useState, useEffect } from 'react'
import { SearchInput } from '@/components/ui/search-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, Video, MoreVertical, Send, Paperclip, Image as ImageIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { MainLayout } from '@/components/layout/MainLayout'
import { getPatients, getMessages, sendMessage, type Patient, type Message } from '@/lib/supabase'

export default function CommunicationPage() {
  const [selectedChat, setSelectedChat] = useState<Patient | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await getPatients()
        setPatients(data)
        if (data.length > 0) {
          setSelectedChat(data[0])
        }
      } catch (error) {
        console.error('Error loading patients:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPatients()
  }, [])

  useEffect(() => {
    async function loadMessages() {
      if (selectedChat) {
        try {
          const data = await getMessages(selectedChat.id)
          setMessages(data)
        } catch (error) {
          console.error('Error loading messages:', error)
        }
      }
    }
    loadMessages()
  }, [selectedChat])

  const handleSendMessage = async () => {
    if (!selectedChat || !messageInput.trim()) return

    try {
      const newMessage = await sendMessage({
        content: messageInput,
        sender_type: 'doctor',
        patient_id: selectedChat.id,
        sender_id: 'current-doctor-id', // This should come from auth context
        is_read: false
      })
      setMessages([...messages, newMessage])
      setMessageInput('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-lg">Loading conversations...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout className="flex h-[calc(100vh-4rem)] gap-6">
      {/* Conversations List */}
      <div className="w-80 flex-shrink-0 border-r">
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <SearchInput
              placeholder="Search conversations..."
              value={search}
              onChange={setSearch}
            />
          </div>
          <div className="flex-1 overflow-auto">
            {patients
              .filter(patient => 
                patient.name.toLowerCase().includes(search.toLowerCase()) ||
                patient.id.toLowerCase().includes(search.toLowerCase())
              )
              .map((patient) => (
                <button
                  key={patient.id}
                  className={`flex w-full items-start gap-3 border-b p-4 text-left hover:bg-gray-50 ${
                    selectedChat?.id === patient.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedChat(patient)}
                >
                  <Avatar>
                    <AvatarImage src={patient.image_url || undefined} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{patient.name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(patient.last_visit).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">#{patient.id}</p>
                    <p className="truncate text-sm">
                      {messages.find(m => m.patient_id === patient.id)?.content || 'No messages yet'}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      patient.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : patient.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }
                  >
                    {patient.status}
                  </Badge>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={selectedChat.image_url || undefined}
                  alt={selectedChat.name}
                />
                <AvatarFallback>
                  {selectedChat.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{selectedChat.name}</h2>
                <p className="text-sm text-gray-500">#{selectedChat.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender_type === 'doctor' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender_type === 'doctor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`mt-1 text-right text-xs ${
                        message.sender_type === 'doctor'
                          ? 'text-blue-200'
                          : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      )}
    </MainLayout>
  )
} 
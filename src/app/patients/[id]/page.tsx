'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainLayout } from '@/components/layout/MainLayout'
import { getPatientById, getTasksByPatient, getMessages, type Patient, type Task, type Message } from '@/lib/supabase'

export default function PatientDetailsPage() {
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [patientData, tasksData, messagesData] = await Promise.all([
          getPatientById(id as string),
          getTasksByPatient(id as string),
          getMessages(id as string)
        ])
        setPatient(patientData)
        setTasks(tasksData)
        setMessages(messagesData)
      } catch (error) {
        console.error('Error loading patient data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-lg">Loading patient details...</div>
        </div>
      </MainLayout>
    )
  }

  if (!patient) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-lg">Patient not found</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-8 p-6">
        {/* Patient Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={patient.image_url || undefined} alt={patient.name} />
              <AvatarFallback>
                {patient.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-gray-500">#{patient.id}</span>
                <Badge
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
              </div>
            </div>
          </div>
          <Button>Edit Patient</Button>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-lg border bg-white p-4">
            <h3 className="font-medium text-gray-500">Age</h3>
            <p className="mt-1 text-2xl font-semibold">{patient.age}</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <h3 className="font-medium text-gray-500">Last Visit</h3>
            <p className="mt-1 text-2xl font-semibold">
              {new Date(patient.last_visit).toLocaleDateString()}
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <h3 className="font-medium text-gray-500">Total Visits</h3>
            <p className="mt-1 text-2xl font-semibold">
              {messages.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tasks">Tasks & Appointments</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border bg-white p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <Badge
                    className={
                      task.priority === 'High'
                        ? 'bg-red-50 text-red-700'
                        : task.priority === 'Medium'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-blue-50 text-blue-700'
                    }
                  >
                    {task.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      task.status === 'Completed'
                        ? 'border-green-200 text-green-700'
                        : 'border-gray-200 text-gray-700'
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(task.time).toLocaleString()}
                </p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
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
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
} 
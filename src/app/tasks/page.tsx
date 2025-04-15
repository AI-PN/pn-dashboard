'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Plus, Filter, List, Calendar as CalendarIcon } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { MainLayout } from '@/components/layout/MainLayout'
import { getTasks, createTask, type Task } from '@/lib/supabase'

export default function TasksPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        setLoading(false)
      }
    }
    loadTasks()
  }, [])

  const handleCreateTask = async () => {
    try {
      const newTask = await createTask({
        title: 'New Task',
        time: new Date().toISOString(),
        priority: 'Medium',
        patient_id: 'P-001', // This should be selected by the user
        status: 'Pending'
      })
      setTasks([newTask, ...tasks])
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-lg">Loading tasks...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Tasks & Calendar</h1>
          <Badge className="bg-green-50 text-green-700">{tasks.length} Tasks Today</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={handleCreateTask}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <nav className="space-y-1">
              <button className="flex w-full items-center gap-2 rounded-lg bg-blue-50 p-2 text-blue-600">
                <CalendarIcon className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg p-2 text-gray-600 hover:bg-gray-50">
                <List className="h-5 w-5" />
                <span>Tasks</span>
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg p-2 text-gray-600 hover:bg-gray-50">
                <CalendarIcon className="h-5 w-5" />
                <span>Calendar</span>
              </button>
            </nav>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Today's Tasks</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Select defaultValue="sort">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="time">Time</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border bg-white p-4"
              >
                <div className="mb-3 flex items-center justify-between">
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
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg width="16" height="4" viewBox="0 0 16 4">
                      <path
                        d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <h3 className="font-medium">{task.title}</h3>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {new Date(task.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {task.patient && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.patient.image_url} alt={task.patient.name} />
                        <AvatarFallback>
                          {task.patient.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500">{task.patient.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">March 2025</h2>
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-1 hover:bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15.8337L6.66667 10.0003L12.5 4.16699" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="rounded-lg p-1 hover:bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 4.16699L13.3333 10.0003L7.5 15.8337" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 3 // Adjust for March 2025 starting on a Thursday
                const isToday = day === 1
                const hasEvents = day === 2

                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center rounded-lg p-2 ${
                      day < 1 || day > 31
                        ? 'invisible'
                        : isToday
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={isToday ? 'font-medium' : ''}>{day}</span>
                    {hasEvents && (
                      <div className="mt-1 flex gap-1">
                        <div className="h-1 w-1 rounded-full bg-blue-600" />
                        <div className="h-1 w-1 rounded-full bg-yellow-600" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 
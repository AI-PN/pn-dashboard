'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { MessageSquare, Phone, UserCog } from 'lucide-react'

// Dummy data
const alerts = [
  {
    id: 1,
    type: 'Medication Non-adherence Alert',
    priority: 'High',
    time: '15 mins ago',
    patient: {
      name: 'John Doe',
      avatar: '/avatars/john-doe.jpg',
    },
    message: 'John Doe missed evening medication dose (Metformin 500mg)',
  },
  {
    id: 2,
    type: 'Symptom Report Alert',
    priority: 'Medium',
    time: '1 hour ago',
    patient: {
      name: 'Sarah Miller',
      avatar: '/avatars/sarah-miller.jpg',
    },
    message: 'Sarah Miller reported increased fatigue and mild fever (38.2°C)',
  },
  {
    id: 3,
    type: 'Vital Signs Alert',
    priority: 'Low',
    time: '2 hours ago',
    patient: {
      name: 'Robert K.',
      avatar: '/avatars/robert-k.jpg',
    },
    message: "Robert K.'s blood pressure slightly elevated (135/85 mmHg)",
  },
]

export default function AlertsPage() {
  return (
    <MainLayout className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">AI-Triggered Alerts & Risk Flags</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="all-categories">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              <SelectItem value="medication">Medication</SelectItem>
              <SelectItem value="symptoms">Symptoms</SelectItem>
              <SelectItem value="vitals">Vitals</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-urgency">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Urgency Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-urgency">All Urgency Levels</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border bg-white p-4 ${
              alert.priority === 'High'
                ? 'border-red-100'
                : alert.priority === 'Medium'
                ? 'border-yellow-100'
                : 'border-blue-100'
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    alert.priority === 'High'
                      ? 'bg-red-50'
                      : alert.priority === 'Medium'
                      ? 'bg-yellow-50'
                      : 'bg-blue-50'
                  }`}
                >
                  <svg
                    className={`h-5 w-5 ${
                      alert.priority === 'High'
                        ? 'text-red-600'
                        : alert.priority === 'Medium'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9V13L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        alert.priority === 'High'
                          ? 'bg-red-50 text-red-700'
                          : alert.priority === 'Medium'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-blue-50 text-blue-700'
                      }
                    >
                      {alert.priority} Priority
                    </Badge>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                  <h3 className="mt-1 font-medium">{alert.type}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                  <MessageSquare className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                  <UserCog className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={alert.patient.avatar} alt={alert.patient.name} />
                <AvatarFallback>
                  {alert.patient.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <p className="text-gray-600">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
} 
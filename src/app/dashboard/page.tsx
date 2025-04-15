'use client'

import { Users, Clock, AlertTriangle, UserPlus } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { PatientList } from '@/components/patients/PatientList'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { MainLayout } from '@/components/layout/MainLayout'

// Dummy data for demonstration
const stats = [
  { title: 'Active Patients', value: '248', icon: Users },
  { title: 'New Patients', value: '12', icon: UserPlus },
  { title: 'Pending Tasks', value: '36', icon: Clock },
  { title: 'Escalations', value: '5', icon: AlertTriangle },
]

const recentPatients = [
  {
    id: '#PA-2025-001',
    name: 'Robert Chen',
    status: 'Follow-up Required' as const,
    image: '/avatars/robert-chen.jpg',
  },
  {
    id: '#PA-2025-002',
    name: 'Maria Garcia',
    status: 'Stable' as const,
    image: '/avatars/maria-garcia.jpg',
  },
]

const recentActivities = [
  {
    type: 'Medication Updated',
    time: '2 hours ago',
  },
  {
    type: 'Appointment Scheduled',
    time: '4 hours ago',
  },
]

const pendingTasks = [
  {
    title: 'Follow up with Robert Chen',
    due: 'Today',
  },
  {
    title: "Review Maria's lab results",
    due: 'Tomorrow',
  },
]

export default function DashboardPage() {
  return (
    <MainLayout className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientList patients={recentPatients} />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.due}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { MainLayout } from '@/components/layout/MainLayout'
// Dummy data
const userRoles = [
  {
    name: 'Physician',
    description: 'Full system access',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Nurse',
    description: 'Limited clinical access',
    color: 'bg-green-100 text-green-700',
  },
]

const escalationRules = [
  {
    name: 'Critical Alert Escalation',
    description: 'Escalate after 5 minutes',
  },
  {
    name: 'After Hours Response',
    description: 'Route to on-call team',
  },
]

const shifts = [
  { name: 'Day Shift', time: '8:00 AM - 4:00 PM', active: true },
  { name: 'Evening Shift', time: '4:00 PM - 12:00 AM', active: true },
  { name: 'Night Shift', time: '12:00 AM - 8:00 AM', active: false },
]

const integrations = [
  {
    name: 'EHR System',
    status: 'Connected',
    lastSync: '5 minutes ago',
    icon: '🏥',
  },
  {
    name: 'Calendar System',
    status: 'Update Available',
    version: '2.1.0',
    icon: '📅',
  },
]

export default function SettingsPage() {
  return (
    <MainLayout className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin & Settings</h1>
          <Badge variant="outline">Admin Mode</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* User Roles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Roles</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userRoles.map((role, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className={role.color}>
                        {role.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{role.name}</p>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Escalation Rules */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Escalation Rules</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Rule
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {escalationRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{rule.name}</p>
                    <p className="text-sm text-gray-500">{rule.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time-Based Access Control */}
        <Card>
          <CardHeader>
            <CardTitle>Time-Based Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shifts.map((shift, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{shift.name}</p>
                    <p className="text-sm text-gray-500">{shift.time}</p>
                  </div>
                  <Switch checked={shift.active} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>System Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{integration.icon}</div>
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-gray-500">
                        {integration.status === 'Connected'
                          ? `Last synced: ${integration.lastSync}`
                          : `Version: ${integration.version}`}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      integration.status === 'Connected'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }
                  >
                    {integration.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
} 
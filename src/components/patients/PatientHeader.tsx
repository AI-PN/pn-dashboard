'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MessageSquare, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PatientHeaderProps {
  patient: {
    id: string
    name: string
    image?: string
    status: string
  }
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b pb-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={patient.image} alt={patient.name} />
          <AvatarFallback>
            {patient.name.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{patient.name}</h1>
            <Badge variant="outline">{patient.id}</Badge>
            <Badge 
              variant="secondary" 
              className={
                patient.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }
            >
              {patient.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
      </div>
    </div>
  )
} 
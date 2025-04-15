'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical, Eye, Edit } from 'lucide-react'
import Link from 'next/link'

interface Patient {
  id: string
  name: string
  image?: string
  status: 'Active' | 'Pending' | 'Stable' | 'Follow-up Required'
  lastVisit?: string
}

interface PatientListProps {
  patients: Patient[]
  showActions?: boolean
}

export function PatientList({ patients, showActions = true }: PatientListProps) {
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Follow-up Required':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex items-center justify-between rounded-lg border bg-white p-4"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={patient.image} alt={patient.name} />
              <AvatarFallback>
                {patient.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">{patient.name}</h3>
              <p className="text-sm text-gray-500">ID: {patient.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge className={getStatusColor(patient.status)} variant="secondary">
              {patient.status}
            </Badge>
            {showActions && (
              <div className="flex items-center gap-2">
                <Link href={`/patients/${patient.id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/patients/${patient.id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 
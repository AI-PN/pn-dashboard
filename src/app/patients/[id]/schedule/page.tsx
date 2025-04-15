'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, ArrowLeft } from 'lucide-react'

export default function SchedulePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [patientId, setPatientId] = useState<string>('')

  useEffect(() => {
    Promise.all([params, searchParams]).then(([{ id }]) => setPatientId(id))
  }, [params, searchParams])

  const handleBack = () => {
    router.push(`/patients/${patientId}`)
  }

  const handleSchedule = () => {
    // In a real app, this would make an API call to schedule the appointment
    console.log('Scheduling appointment:', { date, time, reason })
    router.push(`/patients/${patientId}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Schedule Appointment</h1>
        </div>
      </div>

      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Time</label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Reason for Visit</label>
          <Input
            type="text"
            placeholder="Enter reason for visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <Button className="w-full" onClick={handleSchedule}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>
    </div>
  )
} 
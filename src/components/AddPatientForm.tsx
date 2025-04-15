'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createPatient } from '@/lib/supabase'
import { toast } from 'sonner'

export function AddPatientForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    status: 'Pending' as const,
    image_url: '/avatars/default.jpg',
    last_visit: new Date().toISOString()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const patient = await createPatient({
        ...formData,
        age: parseInt(formData.age)
      })
      toast.success('Patient added successfully')
      router.push(`/patients/${patient.id}`)
      router.refresh()
    } catch (error) {
      console.error('Error adding patient:', error)
      toast.error('Failed to add patient')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
          min="0"
          max="150"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          required
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Stable">Stable</option>
        </select>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding Patient...' : 'Add Patient'}
      </Button>
    </form>
  )
} 
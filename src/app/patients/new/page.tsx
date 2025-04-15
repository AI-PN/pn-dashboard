'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MainLayout } from '@/components/layout/MainLayout'
import { createPatient, type Patient } from '@/lib/supabase'

type PatientFormData = {
  name: string
  age: string
  status: Patient['status']
  image_url: string
}

export default function NewPatientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    age: '',
    status: 'Pending',
    image_url: '/avatars/default.jpg'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createPatient({
        ...formData,
        age: parseInt(formData.age),
        last_visit: new Date().toISOString()
      })
      router.push('/patients')
    } catch (error) {
      console.error('Error creating patient:', error)
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Patient</h1>
          <p className="text-gray-500">Enter the patient's information below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                min="0"
                max="150"
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value: Patient['status']) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Stable">Stable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image URL
              </label>
              <Input
                id="image"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="mt-1"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty to use default avatar
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Patient'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
} 
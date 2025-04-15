'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { getPatients, type Patient } from '@/lib/supabase'

export default function PatientsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await getPatients()
        setPatients(data)
      } catch (error) {
        console.error('Error loading patients:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPatients()
  }, [])

  // Filter patients based on search and status
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddPatient = () => {
    router.push('/patients/new')
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-lg">Loading patients...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-gray-500">Manage your patient records</p>
        </div>
        <Button onClick={handleAddPatient}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          placeholder="Search patients..."
          value={search}
          onChange={setSearch}
          className="sm:w-96"
        />
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Stable">Stable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border bg-white">
        <div className="grid grid-cols-6 gap-4 border-b p-4 font-medium text-gray-500">
          <div className="col-span-2">Patient Name</div>
          <div>ID</div>
          <div>Age</div>
          <div>Status</div>
          <div>Last Visit</div>
        </div>
        {paginatedPatients.map((patient) => (
          <Link
            key={patient.id}
            href={`/patients/${patient.id}`}
            className="grid grid-cols-6 gap-4 border-b p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="col-span-2 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={patient.image_url || undefined} alt={patient.name} />
                <AvatarFallback>
                  {patient.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{patient.name}</span>
            </div>
            <div className="flex items-center">{patient.id}</div>
            <div className="flex items-center">{patient.age}</div>
            <div className="flex items-center">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  patient.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : patient.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {patient.status}
              </span>
            </div>
            <div className="flex items-center">{patient.last_visit}</div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of{' '}
            {filteredPatients.length} results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  )
} 
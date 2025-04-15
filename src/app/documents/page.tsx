'use client'

import { useState } from 'react'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import {
  Upload,
  FileText,
  Download,
  Trash2,
  Edit,
  Share2,
  FilePlus,
  FileSpreadsheet,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { MainLayout } from '@/components/layout/MainLayout'

// Dummy data
const recentDocuments = [
  {
    id: 1,
    name: 'Blood Test Results.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedAt: '2 hours ago',
  },
  {
    id: 2,
    name: 'Patient History.md',
    type: 'Document',
    size: '156 KB',
    uploadedAt: '5 hours ago',
  },
]

const quickActions = [
  {
    name: 'Upload New Document',
    icon: Upload,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Generate Report',
    icon: FileSpreadsheet,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Share Documents',
    icon: Share2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
]

export default function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  return (
    <MainLayout className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents & Reports</h1>
          <p className="text-gray-500">156 Files</p>
        </div>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
              placeholder="Search documents..."
              value={search}
              onChange={setSearch}
              className="sm:w-96"
            />
            <div className="flex items-center gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border bg-white">
            <div className="grid grid-cols-12 gap-4 border-b p-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Actions</div>
            </div>
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-4 border-b p-4 text-sm hover:bg-gray-50"
              >
                <div className="col-span-6 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded {doc.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">{doc.type}</div>
                <div className="col-span-2 flex items-center">{doc.size}</div>
                <div className="col-span-2 flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
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
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex w-full items-center gap-3 rounded-lg border p-3 text-left hover:bg-gray-50"
                >
                  <div
                    className={`rounded-lg ${action.bgColor} p-2 ${action.color}`}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{action.name}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Storage</h2>
            <Progress value={65} className="mb-2" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">6.5 GB used</span>
              <span className="text-gray-500">10 GB total</span>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
} 
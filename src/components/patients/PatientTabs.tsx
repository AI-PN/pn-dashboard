'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

interface PatientTabsProps {
  children: React.ReactNode
  defaultValue?: string
}

const tabItems = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'care-plan', label: 'Care Plan' },
  { value: 'medications', label: 'Medications' },
  { value: 'notes', label: 'Notes & Tasks' },
  { value: 'chat', label: 'Chat History' },
]

export function PatientTabs({ children, defaultValue = 'timeline' }: PatientTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <TabsList className="bg-white">
        {tabItems.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

export function PatientTabContent({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <TabsContent value={value}>
      <Card className="p-6">{children}</Card>
    </TabsContent>
  )
} 
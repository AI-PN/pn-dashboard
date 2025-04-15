import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  className?: string
}

export function StatsCard({ title, value, icon: Icon, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="rounded-full bg-blue-50 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
} 
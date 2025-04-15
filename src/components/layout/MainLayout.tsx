'use client'

import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className={cn('flex-1 overflow-auto p-8', className)}>
        {children}
      </main>
    </div>
  )
} 
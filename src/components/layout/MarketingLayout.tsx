'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Menu, X } from 'lucide-react'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')
  
  // In a real app, this would come from your auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="w-full border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-blue-600">Patient Navigator</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="/features"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Features
                </Link>
                <Link
                  href="/about"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Contact
                </Link>
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                      <Button>Go to Dashboard</Button>
                    </Link>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/user.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="relative"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/features"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Features
              </Link>
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <div className="space-y-2 px-3 py-2">
                  <Link href="/dashboard">
                    <Button className="w-full">Go to Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <div className="px-3 py-2">
                  <Link href="/login">
                    <Button className="w-full">Login</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
} 
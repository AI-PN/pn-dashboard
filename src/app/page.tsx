'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import MarketingLayout from '@/components/layout/MarketingLayout'

export default function HomePage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Healthcare Through Patient Navigation
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-white/90 sm:text-xl md:text-2xl">
            Bridging the gap between patients and healthcare providers, one journey at a time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="min-w-[140px] bg-white text-blue-600 hover:bg-blue-50">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="min-w-[140px] border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <Users className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-4xl font-bold">10,000+</h3>
              <p className="text-gray-600">Patients Supported</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <Heart className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-4xl font-bold">95%</h3>
              <p className="text-gray-600">Patient Satisfaction</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <Clock className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-4xl font-bold">24/7</h3>
              <p className="text-gray-600">Support Available</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <Shield className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-4xl font-bold">100%</h3>
              <p className="text-gray-600">HIPAA Compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">The Power of Patient Navigation</h2>
              <p className="mb-6 text-lg text-gray-600">
                Patient Navigators are the unsung heroes of healthcare, guiding patients through complex medical systems and ensuring they receive the care they need.
              </p>
              <p className="mb-6 text-lg text-gray-600">
                Our platform empowers these dedicated professionals with the tools they need to make a real difference in patients' lives.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-blue-100 p-1">
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">Streamlined patient communication</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-blue-100 p-1">
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">Comprehensive care coordination</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-blue-100 p-1">
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">Real-time progress tracking</p>
                </li>
              </ul>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400">Image placeholder</p>
                  <p className="text-sm text-gray-400">Replace with actual patient navigator image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">Ready to Make a Difference?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Join our community of patient navigators and start transforming healthcare today.
          </p>
          <Button size="lg" className="min-w-[200px] bg-white text-blue-600 hover:bg-blue-50">
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </MarketingLayout>
  )
}

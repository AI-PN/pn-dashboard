'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MainLayout } from '@/components/layout/MainLayout'
// Dummy data for charts
const adherenceData = [
  { date: 'Mar 1', rate: 85 },
  { date: 'Mar 2', rate: 88 },
  { date: 'Mar 3', rate: 92 },
  { date: 'Mar 4', rate: 90 },
  { date: 'Mar 5', rate: 95 },
  { date: 'Mar 6', rate: 89 },
  { date: 'Mar 7', rate: 91 },
]

const insights = [
  {
    id: 1,
    title: 'Medication Adherence Trend',
    description: 'Overall medication adherence has improved by 12% in the last week.',
    trend: 'positive',
    data: adherenceData,
  },
  {
    id: 2,
    title: 'High-Risk Patient Analysis',
    description: '3 patients show increased risk factors requiring immediate attention.',
    trend: 'negative',
    metrics: [
      { label: 'High Risk', value: '3 patients' },
      { label: 'Medium Risk', value: '8 patients' },
      { label: 'Low Risk', value: '24 patients' },
    ],
  },
  {
    id: 3,
    title: 'Care Plan Effectiveness',
    description: 'Care plans are showing 85% effectiveness based on patient outcomes.',
    trend: 'neutral',
    metrics: [
      { label: 'Effective', value: '85%' },
      { label: 'Needs Review', value: '10%' },
      { label: 'Ineffective', value: '5%' },
    ],
  },
]

export default function InsightsPage() {
  return (
    <MainLayout className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">AI-Generated Insights & Analytics</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="last-7-days">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                {insight.title}
                <span
                  className={`rounded-full p-1 ${
                    insight.trend === 'positive'
                      ? 'bg-green-50 text-green-600'
                      : insight.trend === 'negative'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {insight.trend === 'positive' ? '↑' : insight.trend === 'negative' ? '↓' : '→'}
                </span>
              </CardTitle>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </CardHeader>
            <CardContent>
              {insight.data ? (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={insight.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: '#2563eb' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="space-y-2">
                  {insight.metrics?.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  )
} 
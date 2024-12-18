'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
  id: string
  title: string
  date: string
  description?: string
  type: 'activity' | 'upcoming'
}

export function EventList({ events, type }: { events: Event[], type: 'activity' | 'upcoming' }) {
  const filteredEvents = events.filter(event => event.type === type)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === 'activity' ? "Today's Activities" : 'Upcoming Events'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="border-b pb-2 last:border-0">
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toLocaleDateString()}
            </p>
            {event.description && (
              <p className="text-sm mt-1">{event.description}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


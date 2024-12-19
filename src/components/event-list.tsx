'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Event } from '@/payload-types'

export function EventList({ events, type }: { events: Event[]; type: 'activity' | 'upcoming' }) {
  console.log(events)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const filteredEvents = events
    .filter((event) => {
      const startDate = new Date(event.startDate)
      const endDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate)
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(0, 0, 0, 0)

      if (type === 'activity') {
        return today.getTime() >= startDate.getTime() && today.getTime() <= endDate.getTime()
      } else {
        return startDate.getTime() > today.getTime()
      }
    })
    .slice(0, 6)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          {type === 'activity' ? "Today's Activities" : 'Upcoming Events'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">
            {type === 'activity' ? "No Today's Activity" : 'No Upcoming Events'}
          </p>
        ) : (
          <ul className="list-disc pl-4">
            {filteredEvents.map((event) => (
              <li key={event.id} className="border-b text-xl pb-2 last:border-0">
                <p className="font-medium">{event.title}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

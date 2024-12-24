'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MessageCarousel } from './message-carousel'
import { NoticeTable } from './notice-table'
import { EventList } from './event-list'
import { StaffFooter } from './staff-footer'
import Marquee from './ui/marquee'

type Data = {
  messages: { image: string }[]
  notices: any[]
  events: any[]
  staff: any
  marquee: string
}

export function DynamicContent({ initialData }: { initialData: Data }) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const eventSource = new EventSource('/api/updates')

    eventSource.onmessage = (event) => {
      const updatedData = JSON.parse(event.data)
      setData(updatedData)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="bg-background px-4">
      <main className="py-4 mb-5">
        <div className="flex mb-4">
          <div className="">
            <Image src="/logo.png" alt="Texas International College" width={140} height={150} />
          </div>
          <h1 className="text-3xl w-full font-bold text-center mb-4">
            Texas International College
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <MessageCarousel messages={data.messages} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Notice Board</h2>
            <NoticeTable notices={data.notices} />
          </div>

          <div className="min-h-[30vh]">
            <EventList events={data.events} type="activity" />
          </div>
          <div className="min-h-[30vh]">
            <EventList events={data.events} type="upcoming" />
          </div>
        </div>
      </main>
      <Marquee repeat={1000} className="w-full bg-yellow-300 [--duration:10s]">
        {data.marquee}
      </Marquee>
      {data.staff && <StaffFooter staff={data.staff} />}
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'

type Data = {
  messages: { image: string }[]
  notices: any[]
  events: any[]
  staff: any
  marquee: string
}

export function RealtimeUpdates({ initialData, children }: { initialData: Data; children: (data: Data) => React.ReactNode }) {
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

  return <>{children(data)}</>
}


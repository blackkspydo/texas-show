import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Media } from '@/payload-types'

export async function GET() {
  const payload = await getPayload({ config })

  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = async () => {
        const [carousel, notices, events, staff, marquee] = await Promise.all([
          await payload.findGlobal({
            slug: 'carousel',
            depth: 1,
          }),
          await payload.find({ collection: 'notices', limit: 50 }),
          await payload.find({ collection: 'events', limit: 50 }),
          await payload.findGlobal({
            slug: 'staff',
            depth: 1,
          }),
          await payload.findGlobal({
            slug: 'marquee',
            depth: 1,
          }),
        ])

        const data = {
          messages: carousel.images?.map((image) => ({
            image: (image.image as Media).url,
          })) as unknown as {
            image: string
          }[],
          notices: notices.docs,
          events: events.docs,
          staff: staff.staff,
          marquee: marquee.marquee,
        }

        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
      }

      // Send initial data
      await sendUpdate()

      // Set up interval to send updates every 5 seconds
      const interval = setInterval(sendUpdate, 5000)

      // Clean up interval on close
      return () => clearInterval(interval)
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

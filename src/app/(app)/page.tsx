import { MessageCarousel } from '@/components/message-carousel'
import { NoticeTable } from '@/components/notice-table'
import { EventList } from '@/components/event-list'
import { StaffFooter } from '@/components/staff-footer'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Marquee from '@/components/ui/marquee'
import Image from 'next/image'

async function getData() {
  const payload = await getPayload({ config })

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
  console.log({
    carousel: carousel.images,
    notices: notices.docs,
    events: events.docs,
    staff: staff.staff,
  })
  return {
    messages: carousel.images?.map((image) => ({ image: image.image.url })),
    notices: notices.docs,
    events: events.docs,
    staff: staff.staff,
    marquee: marquee.marquee,
  }
}

export default async function Page() {
  const data = await getData()

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
      <Marquee repeat={1000} className="w-full  bg-yellow-300 [--duration:10s]">
        {data.marquee}
      </Marquee>
      <StaffFooter staff={data.staff} />
    </div>
  )
}

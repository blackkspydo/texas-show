import { MessageCarousel } from '@/components/message-carousel'
import { NoticeTable } from '@/components/notice-table'
import { EventList } from '@/components/event-list'
import { StaffFooter } from '@/components/staff-footer'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Marquee from '@/components/ui/marquee'
import Image from 'next/image'
import { Media, Staff } from '@/payload-types'
import { DynamicContent } from '@/components/dynamic-content'

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

  return {
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
}

export default async function Page() {
  const initialData = await getData()

  return (
    <DynamicContent initialData={initialData} />
  )
}


import { MessageCarousel } from "@/components/message-carousel"
import { NoticeTable } from "@/components/notice-table"
import { EventList } from "@/components/event-list"
import { StaffFooter } from "@/components/staff-footer"

async function getData() {
  // In a real application, you would fetch this data from your Payload CMS
  // using their REST API or SDK
  return {
    messages: [/* ... */],
    notices: [/* ... */],
    events: [/* ... */],
    staff: [/* ... */],
  }
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Texas International College
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Left: Department Head Message */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Message From the Department Head
            </h2>
            <MessageCarousel messages={data.messages} />
          </div>

          {/* Top Right: Notice Board */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Notice Board</h2>
            <NoticeTable notices={data.notices} />
          </div>

          {/* Bottom Left: Today's Activities */}
          <div>
            <EventList events={data.events} type="activity" />
          </div>

          {/* Bottom Right: Upcoming Events */}
          <div>
            <EventList events={data.events} type="upcoming" />
          </div>
        </div>
      </main>

      <StaffFooter staff={data.staff} />
    </div>
  )
}


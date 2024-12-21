import { Staff } from '@/payload-types'

export function StaffFooter({ staff }: { staff: Staff['staff'] }) {
  return (
    <footer className="bg-muted fixed bottom-0 w-full p-4 mt-8">
      <div className="grid grid-cols-1 place-content-center place-items-center md:grid-cols-10 gap-6">
        {staff?.slice(0, 10).map((member) => (
          <div key={member.id}>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-muted-foreground">{member.position}</p>
              {member.phone && <p className="text-muted-foreground">{member.phone}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="py-2 mt-4">
        <p className="text-center text-muted-foreground">Build By Kishor Upadhyaya @ CSIT-2078</p>
      </div>
    </footer>
  )
}

export function StaffFooter({ staff }: { staff: any[] }) {
  const groupedStaff = staff.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = [];
    }
    acc[member.department].push(member);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <footer className="bg-muted mt-8 py-6">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        {['head', 'academic', 'faculty'].map((dept) => (
          <div key={dept} className="space-y-2">
            <h3 className="font-bold capitalize">
              {dept === 'head' ? 'Department Head' : 
               dept === 'academic' ? 'Academic Coordinator' : 
               'Full Time Faculty'}
            </h3>
            {groupedStaff[dept]?.map((member) => (
              <div key={member.id} className="text-sm">
                <p className="font-medium">{member.name}</p>
                <p className="text-muted-foreground">{member.position}</p>
                {member.phone && (
                  <p className="text-muted-foreground">{member.phone}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}


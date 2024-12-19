'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Notice {
  id: string
  title: string
  date: string
  content: string
}

export function NoticeTable({ notices }: { notices: Notice[] }) {
  const emptyRows = Array(6 - notices.length).fill(null)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-2xl">Date</TableHead>
            <TableHead className="text-2xl">Notice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.slice(0, 5).map((notice) => (
            <TableRow key={notice.id}>
              <TableCell className="text-xl" width={200}>
                {new Date(notice.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xl">{notice.title}</TableCell>
            </TableRow>
          ))}
          {emptyRows.map((_, index) => (
            <TableRow key={`empty-${index}`}>
              <TableCell height={50} width={200}></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

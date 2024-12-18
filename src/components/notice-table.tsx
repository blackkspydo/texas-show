'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Notice {
  id: string
  title: string
  date: string
  content: string
}

export function NoticeTable({ notices }: { notices: Notice[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Notice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.map((notice) => (
            <TableRow key={notice.id}>
              <TableCell>{new Date(notice.date).toLocaleDateString()}</TableCell>
              <TableCell>{notice.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


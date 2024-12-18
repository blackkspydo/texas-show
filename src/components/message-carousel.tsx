'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface Message {
  id: string
  title: string
  content: string
  image: {
    url: string
  }
}

export function MessageCarousel({ messages }: { messages: Message[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {messages.map((message) => (
          <CarouselItem key={message.id}>
            <Card>
              <CardContent className="flex p-6 items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={message.image.url}
                    alt={message.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{message.title}</h3>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}


'use client'

import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

interface Message {
  image: string
}

export function MessageCarousel({ messages }: { messages: Message[] }) {
  return (
    <Carousel autoplay className="relative h-[35vh] w-full">
      <CarouselContent>
        {messages.map((feature) => (
          <CarouselItem key={feature.image}>
            <Image
              src={feature.image}
              alt="Department Head Message"
              width={1400}
              height={1000}
              className="w-full h-[35vh] object-center object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>{' '}
    </Carousel>
  )
}

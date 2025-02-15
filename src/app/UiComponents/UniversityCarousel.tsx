"use client";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Universities = [
  {
    name: "IIT Bombay",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/IIT_Bombay_Logo.svg",
  },
  {
    name: "IIT Madras",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/IIT_Madras_Logo.svg",
  },
  {
    name: "IIT Delhi",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c1/IIT_Delhi_Logo.svg",
  },
  {
    name: "IIT Kharagpur",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/IIT_Kharagpur_Logo.svg",
  },
  {
    name: "IIT Roorkee",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/17/IIT_Roorkee_Logo.svg",
  },
  {
    name: "IIT Goa",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/17/IIT_Roorkee_Logo.svg",
  },
  {
    name: "IIT Jammu",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/17/IIT_Roorkee_Logo.svg",
  },
];

export function UniversityCarousel() {
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true, duration: 500 }}
      plugins={[Autoplay({ active: true })]}
    >
      <CarouselContent className="-ml-1">
        {Universities.map((university, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card className="shadow-md border">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Image loading="lazy"
                    src={"/mainlogo.jpeg"}
                    alt={university.name}
                    width={100}
                    height={100}
                    className="rounded-full object-contain"
                  />
                  <p className="text-lg font-semibold mt-2">
                    {university.name}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function CollegeCarousel() {
  const reversedUniversities = [...Universities].reverse(); // ✅ Fix: Reverse the array for RTL scrolling

  return (
    <Carousel
    className="w-full"
    opts={{ loop: true, duration: 500 }}
    plugins={[Autoplay({ active: true })]}
  >
      <CarouselContent className="-ml-1">
        {reversedUniversities.map((university, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card className="shadow-md border">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Image
                    src={"/mainlogo.jpeg"}
                    alt={university.name}
                    width={100}
                    height={100}
                    className="rounded-full object-contain"
                  />
                  <p className="text-lg font-semibold mt-2">
                    {university.name}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

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
    fullName: "Guru Gobind Singh Indraprastha University",
    logoUrl: "/landing/universitiesLogo/ipu.png",
    abbreviation: "GGSIPU",
  },
  {
    fullName: "Dr. A.P.J. Abdul Kalam Technical University",
    logoUrl: "/landing/universitiesLogo/aktu.jpeg",
    abbreviation: "AKTU",
  },
  {
    fullName: "University of Delhi",
    logoUrl: "/landing/universitiesLogo/du.png",
    abbreviation: "DU",
  },
  {
    fullName: "Indira Gandhi Delhi Technical University for Women",
    logoUrl: "/landing/universitiesLogo/igdtuw.png",
    abbreviation: "IGDTUW",
  },
  {
    fullName: "Indira Gandhi Delhi Technical University for Women",
    logoUrl: "/landing/universitiesLogo/igdtuw.png",
    abbreviation: "IGDTUW",
  },
  {
    fullName: "Indira Gandhi Delhi Technical University for Women",
    logoUrl: "/landing/universitiesLogo/igdtuw.png",
    abbreviation: "IGDTUW",
  },
  {
    fullName: "Indira Gandhi Delhi Technical University for Women",
    logoUrl: "/landing/universitiesLogo/igdtuw.png",
    abbreviation: "IGDTUW",
  },
];
export function UniversityCarousel() {
  return (
    <Carousel
      className="w-full"
      opts={{ loop: true, duration: 500 }}
      plugins={[
        Autoplay({
          active: true,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {Universities.map((university, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card className="shadow-md border h-[250px]">
                <CardContent className="flex flex-col items-center justify-between p-6">
                  <Image
                    loading="lazy"
                    src={university.logoUrl}
                    alt={university.fullName}
                    width={100}
                    height={100}
                    className="rounded-full object-contain"
                  />
                  <p className="text-lg text-center font-semibold mt-2">
                    {university.fullName}
                  </p>
                  <span>({university.abbreviation})</span>
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
              <Card className="shadow-md border h-[250px]">
                <CardContent className="flex flex-col items-center justify-between p-6">
                  <Image
                    src={university.logoUrl}
                    alt={university.fullName}
                    width={100}
                    height={100}
                    className="rounded-full object-contain"
                  />
                  <p className="text-lg font-semibold mt-2 text-center">
                    {university.fullName}
                  </p>
                  <span>({university.abbreviation})</span>
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

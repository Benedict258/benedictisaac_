"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface TestimonialItem {
  title: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: TestimonialItem[] = [
  {
    title: "Best decision",
    quote:
      "Benedict delivered a clean, scalable frontend ahead of schedule. The UI is fast and the codebase is easy to extend.",
    author: "Jordan Miles",
    role: "Product Lead",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=96&h=96&q=80",
  },
  {
    title: "Repeat partner",
    quote:
      "Clear communication, sharp execution, and thoughtful UX choices. We shipped confidently with no last-minute surprises.",
    author: "Amina Yusuf",
    role: "Founder, Tenax",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&w=96&h=96&q=80",
  },
  {
    title: "Performance win",
    quote:
      "Our dashboard performance improved dramatically after the refactor. Strong attention to detail and data visualization.",
    author: "Hugo Park",
    role: "Engineering Manager",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=96&h=96&q=80",
  },
  {
    title: "Design aligned",
    quote:
      "He turns complex requirements into crisp, usable interfaces and keeps design intent intact throughout delivery.",
    author: "Sofia Grant",
    role: "Design Director",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=96&h=96&q=80",
  },
  {
    title: "Revenue lift",
    quote:
      "The new product pages raised conversions and reduced support tickets. Consistent craft and polish across breakpoints.",
    author: "Ethan Cole",
    role: "Growth Lead",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&w=96&h=96&q=80",
  },
  {
    title: "Reliable partner",
    quote:
      "Solid architecture choices, documentation, and calm leadership under pressure. Would work together again.",
    author: "Nina Patel",
    role: "CTO, Flux Labs",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=96&h=96&q=80",
  },
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto flex flex-col gap-10">
        <div className="space-y-4 max-w-3xl">
          <p className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium">
            Testimonials
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            What collaborators say
          </h2>
          <p className="text-muted-foreground text-lg">
            Direct feedback from founders, product leads, and engineers I ship with across AI, web, and systems teams.
          </p>
        </div>

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem className="lg:basis-1/2" key={item.author + index}>
                <article className="flex h-full flex-col justify-between rounded-3xl border bg-background/80 p-6 shadow-lg shadow-primary/5">
                  <User className="h-10 w-10 stroke-1 text-primary" />
                  <div className="mt-6 flex flex-col gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-base text-muted-foreground">
                        {item.quote}
                      </p>
                    </div>
                    <p className="flex items-center gap-3 text-sm font-medium">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.avatar} alt={item.author} />
                        <AvatarFallback>
                          {item.author
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{item.author}</span>
                      <span className="text-muted-foreground">— {item.role}</span>
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;

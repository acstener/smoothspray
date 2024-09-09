import React from 'react'
import Link from 'next/link'
import { getAllServices } from '@/lib/data'
import { ArrowRight, Check, Brush } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const services = getAllServices()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <Brush className="w-6 h-6 mr-2" />
            Spray Painter
          </h1>
          <nav className="space-x-4">
            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 space-y-16">
        <section className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Elevate Your Space with Expert Spray Painting</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your home and furniture with our premium spray painting services. Experience flawless finishes and unparalleled quality.
          </p>
          <Button asChild size="lg">
            <Link href="/get-a-quote">Get a Free Consultation</Link>
          </Button>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Our Premium Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.slug} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild variant="outline">
                    <Link href={`/services/${service.slug}`}>
                      Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose Spray Painter?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Expert artisans with years of experience",
                  "Premium, eco-friendly paint options",
                  "Cutting-edge spray technology for flawless finishes",
                  "Efficient service with minimal disruption",
                  "Tailored solutions for your unique vision",
                  "Comprehensive warranty on all our work",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let&apos;s bring your vision to life with our expert spray painting services.
          </p>
          <Button asChild size="lg">
            <Link href="/get-a-quote">Request a Quote</Link>
          </Button>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Sarah L.", quote: "Absolutely thrilled with the transformation of my kitchen cabinets. The team was professional, efficient, and the finish is flawless!" },
              { name: "Michael R.", quote: "I never thought my old furniture could look so modern and fresh. Spray Painter breathed new life into my favorite pieces. Highly recommended!" },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">&copy; 2023 Spray Painter. All rights reserved.</p>
            <nav className="flex space-x-4">
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
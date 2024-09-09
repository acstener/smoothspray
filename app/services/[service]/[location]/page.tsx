import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceLocationData, getAllServiceLocationSlugs } from '@/lib/data'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Star } from 'lucide-react'

export async function generateStaticParams() {
  return getAllServiceLocationSlugs()
}

export default function ServiceLocation({ params }: { params: { service: string, location: string } }) {
  const data = getServiceLocationData(params.service, params.location)

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Service or Location Not Found</h1>
        <p className="mb-8">We couldn't find the specific service or location you're looking for. It may have been moved or doesn't exist.</p>
        <Button asChild>
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
      <p className="text-xl mb-8">{data.introduction}</p>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Local Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.localizedDescription}</p>
        </CardContent>
      </Card>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.whyChooseUs.map((reason: string, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{reason}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Recent Projects</h2>
        {data.recentProjects.map((project: any, index: number) => (
          <Card key={index} className="mb-6">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative h-64">
                  <Image 
                    src="/placeholder.svg" 
                    alt="Before" 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-lg"
                  />
                  <Badge className="absolute top-2 left-2">Before</Badge>
                </div>
                <div className="relative h-64">
                  <Image 
                    src="/placeholder.svg" 
                    alt="After" 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-lg"
                  />
                  <Badge className="absolute top-2 left-2">After</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.testimonials.map((testimonial: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="italic mb-2">"{testimonial.text}"</blockquote>
                <p className="font-semibold">- {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Pricing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.pricingInfo}</p>
        </CardContent>
      </Card>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Service Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.serviceAreas.map((area: string, index: number) => (
            <div key={index} className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {data.faq.map((item: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.aboutUs}</p>
        </CardContent>
      </Card>

      <Card className="mb-12 bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Ready to Transform Your Space?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Get in touch with us today for a free consultation and quote!</p>
          <Button asChild variant="secondary">
            <Link href="/get-a-quote">Get a Free Quote</Link>
          </Button>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-3xl font-bold mb-6">Related Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.relatedServices.map((service: string, index: number) => (
            <Button key={index} variant="outline" className="justify-start" asChild>
              <Link href={`/services/${service.toLowerCase().replace(' ', '-')}`}>
                <ArrowRight className="mr-2 h-4 w-4" />
                {service}
              </Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}
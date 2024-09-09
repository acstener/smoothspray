/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceLocationData, getAllServiceLocationSlugs } from '@/lib/data'
import { getSpecificImage, getRandomImage } from '@/lib/unsplash'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Star } from 'lucide-react'

export async function generateStaticParams() {
  return getAllServiceLocationSlugs()
}

interface ServiceLocationData {
  title?: string;
  introduction?: string;
  localizedDescription?: string;
  whyChooseUs?: string[];
  recentProjects?: Array<{
    title: string;
    description: string;
  }>;
  testimonials?: Array<{
    text: string;
    author: string;
  }>;
  pricingInfo?: string;
  serviceAreas?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  aboutUs?: string;
  relatedServices?: string[];
}

export default async function ServiceLocation({ params }: { params: { service: string, location: string } }) {
  const data = await getServiceLocationData(params.service, params.location) as ServiceLocationData;
  
  if (!data) {
    return <div>Service location not found</div>;
  }

  const mainImage = await getSpecificImage('abc123');
  const beforeAfterImages = await getRandomImage(`${params.service} before after`, 2);

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {mainImage && (
        <Image 
          src={mainImage.urls.regular}
          alt={data.title || `${params.service} in ${params.location}`}
          width={600}
          height={400}
          className="rounded-lg object-cover w-full h-[400px] mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{data.title || `${params.service} in ${params.location}`}</h1>
      {data.introduction && <p className="text-xl mb-8">{data.introduction}</p>}

      {data.localizedDescription && (
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Local Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.localizedDescription}</p>
          </CardContent>
        </Card>
      )}

      {data.whyChooseUs && data.whyChooseUs.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whyChooseUs.map((reason, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{reason}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {data.recentProjects && data.recentProjects.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Projects</h2>
          {data.recentProjects.map((project, index) => (
            <Card key={index} className="mb-8">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {beforeAfterImages && Array.isArray(beforeAfterImages) && beforeAfterImages.length === 2 ? (
                    <>
                      <div className="relative h-64">
                        <Image 
                          src={beforeAfterImages[0].urls.regular} 
                          alt="Before" 
                          width={300}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                        <Badge className="absolute top-2 left-2">Before</Badge>
                      </div>
                      <div className="relative h-64">
                        <Image 
                          src={beforeAfterImages[1].urls.regular} 
                          alt="After" 
                          width={300}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                        <Badge className="absolute top-2 left-2">After</Badge>
                      </div>
                    </>
                  ) : (
                    <p>Images not available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {data.testimonials && data.testimonials.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="italic mb-2">&quot;{testimonial.text}&quot;</blockquote>
                  <p className="font-semibold">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Card className="mb-16">
        <CardHeader>
          <CardTitle>Pricing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.pricingInfo}</p>
        </CardContent>
      </Card>

      {data.serviceAreas && data.serviceAreas.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Service Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.serviceAreas.map((area, index) => (
              <div key={index} className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.faq && data.faq.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      <Card className="mb-16">
        <CardHeader>
          <CardTitle>About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.aboutUs}</p>
        </CardContent>
      </Card>

      <Card className="mb-16 bg-primary text-primary-foreground">
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

      {data.relatedServices && data.relatedServices.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.relatedServices.map((service, index) => (
              <Button key={index} variant="outline" className="justify-start" asChild>
                <Link href={`/services/${service.toLowerCase().replace(' ', '-')}`}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {service}
                </Link>
              </Button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
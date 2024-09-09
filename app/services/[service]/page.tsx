/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceData, getAllServices } from '@/lib/data'
import { getSpecificImage } from '@/lib/unsplash'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, MapPin, Phone, Mail, CheckCircle, Droplet, Leaf, Clock, PaintBucket } from 'lucide-react'

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service: any) => ({ service: service.slug }))
}

interface ServiceData {
  slug: string;
  name: string;
  description: string;
  image: string;
  imageId: string;
  subServices: string[];
  introduction: string;
  benefits: Array<{ title: string; description: string }>;
  whyChooseUs: Array<{ title: string; description: string }>;
  process: string[];
  materialsAndFinishes: Array<{ title: string; description: string }>;
  beforeAfterGallery: Array<{ before: string; after: string; description: string }>;
  faq: Array<{ question: string; answer: string }>;
  elementsWeSpray: Array<{ element: string; description: string }>;
  professionalBenefits: Array<{ benefit: string; description: string }>;
  maintenanceAndCare: { description: string; longevity: string };
  customerTestimonials: Array<{ quote: string; author: string }>;
  pricingInfo: string;
  environmentalCommitment: { ecoFriendlyOptions: string; wasteReduction: string };
  locations: Array<{
    slug: string;
    title: string;
  }>;
}

export default async function Service({ params }: { params: { service: string } }) {
  console.log("Service slug:", params.service);

  const serviceData = await getServiceData(params.service);
  console.log("Service data:", serviceData);
  
  if (!serviceData) {
    console.log("Service not found");
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">We couldn&apos;t find the service you&apos;re looking for. It may have been moved or doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    )
  }

  let serviceImage = null;
  if (serviceData.imageId) {
    try {
      serviceImage = await getSpecificImage(serviceData.imageId);
      console.log("Service image fetched:", serviceImage);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <h1 className="text-4xl font-bold mb-6">{serviceData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div>
          {serviceImage && (
            <Image 
              src={serviceImage.urls.regular}
              alt={serviceData.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          )}
        </div>
        <div>
          <p className="text-lg mb-6">{serviceData.description}</p>
          {serviceData.subServices && (
            <Card>
              <CardHeader>
                <CardTitle>Our {serviceData.name} Services Include:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceData.subServices.map((subService: string) => (
                    <li key={subService} className="flex items-center">
                      <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                      {subService}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Introduction */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Introduction to {serviceData.name}</h2>
        <p className="mb-4">{serviceData.introduction || "Detailed information about this service is not available at the moment."}</p>
        {serviceData.benefits && serviceData.benefits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceData.benefits.map((benefit: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Our {serviceData.name} Service</h2>
        {serviceData.whyChooseUs && serviceData.whyChooseUs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceData.whyChooseUs.map((reason: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Our Process */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Our Process</h2>
        {serviceData.process && serviceData.process.length > 0 ? (
          <ol className="list-decimal list-inside space-y-3">
            {serviceData.process.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>Our process information is currently being updated. Please check back soon.</p>
        )}
      </section>

      {/* Materials and Finishes */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Materials and Finishes</h2>
        {serviceData.materialsAndFinishes && serviceData.materialsAndFinishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceData.materialsAndFinishes.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>Information on materials and finishes is not available at the moment.</p>
        )}
      </section>

      {/* Before and After Gallery */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Before and After Gallery</h2>
        {serviceData.beforeAfterGallery && serviceData.beforeAfterGallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceData.beforeAfterGallery.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <div className="relative h-64">
                    <Image
                      src={item.before}
                      alt={`Before and After ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="relative h-64">
                    <Image
                      src={item.after}
                      alt={`Before and After ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className="mt-2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>Before and after gallery images are not available at the moment.</p>
        )}
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">FAQs About {serviceData.name}</h2>
        {serviceData.faq && serviceData.faq.length > 0 ? (
          <Accordion type="single" collapsible>
            {serviceData.faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p>FAQs are not available at the moment.</p>
        )}
      </section>

      {/* Elements We Work On */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Elements We Work On</h2>
        {serviceData.elementsWeSpray && serviceData.elementsWeSpray.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceData.elementsWeSpray.map((element, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PaintBucket className="mr-2 h-5 w-5 text-blue-500" />
                    {element.element}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{element.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>Information on elements we work on is not available at the moment.</p>
        )}
      </section>

      {/* Benefits of Professional Service */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Benefits of Professional {serviceData.name}</h2>
        {serviceData.professionalBenefits && serviceData.professionalBenefits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceData.professionalBenefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{benefit.benefit}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>Information on benefits of professional service is not available at the moment.</p>
        )}
      </section>

      {/* Maintenance and Care */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Maintenance and Care</h2>
        {serviceData.maintenanceAndCare ? (
          <Card>
            <CardHeader>
              <CardTitle>Caring for Your Sprayed Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{serviceData.maintenanceAndCare.description}</p>
              <p className="mt-2">Longevity of the finish: {serviceData.maintenanceAndCare.longevity}</p>
            </CardContent>
          </Card>
        ) : (
          <p>Maintenance and care information is not available at the moment.</p>
        )}
      </section>

      {/* Customer Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Customer Testimonials</h2>
        {serviceData.customerTestimonials && serviceData.customerTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceData.customerTestimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <blockquote className="italic">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <p className="mt-2 font-semibold">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>Customer testimonials are not available at the moment.</p>
        )}
        <Button className="mt-4" asChild>
          <Link href="/case-studies">View Detailed Case Studies</Link>
        </Button>
      </section>

      {/* Pricing Guide */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Pricing Guide</h2>
        {serviceData.pricingInfo ? (
          <Card>
            <CardHeader>
              <CardTitle>Factors Affecting Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{serviceData.pricingInfo}</p>
              <Button>Request a Quote</Button>
            </CardContent>
          </Card>
        ) : (
          <p>Pricing information is not available at the moment.</p>
        )}
      </section>

      {/* Environmental Commitment */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Our Environmental Commitment</h2>
        {serviceData.environmentalCommitment ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start mb-4">
                <Leaf className="mr-4 h-6 w-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Eco-Friendly Paint Options</h3>
                  <p>{serviceData.environmentalCommitment.ecoFriendlyOptions}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Droplet className="mr-4 h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Waste Reduction</h3>
                  <p>{serviceData.environmentalCommitment.wasteReduction}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p>Environmental commitment information is not available at the moment.</p>
        )}
      </section>

      {/* Locations */}
      <section className="mb-16">
        {serviceData.locations && serviceData.locations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>We Serve These Locations</CardTitle>
              <CardDescription>Find a {serviceData.name} service near you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {serviceData.locations.map((location: any) => (
                  <Button key={location.slug} variant="outline" asChild className="justify-start">
                    <Link href={`/services/${params.service}/${location.slug}`}>
                      <MapPin className="mr-2 h-4 w-4" />
                      {location.title.replace(`${serviceData.name} Services in `, '')}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Contact Information and Next Steps */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Ready to Transform Your Space?</CardTitle>
            <CardDescription>Get in touch with us today for a free consultation and quote!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>Call us: (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>Email: info@spraypainting.com</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Book your free consultation today!</span>
            </div>
            <Button asChild>
              <Link href="/get-a-quote">Get a Free Quote</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
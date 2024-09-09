import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceLocationData, getAllServiceLocationSlugs } from '@/lib/data'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, MapPin, Phone, Mail, CheckCircle, Droplet, Leaf, Clock, PaintBucket } from 'lucide-react'
import QuoteModal from '@/components/QuoteModal'

export async function generateStaticParams() {
  return getAllServiceLocationSlugs()
}

interface ServiceLocationData extends ServiceData {
  location: {
    slug: string;
    title: string;
    introduction: string;
    localizedDescription: string;
    whyChooseUs?: string[];
    recentProjects?: Array<{ title: string; description: string }>;
    testimonials?: Array<{ text: string; author: string }>;
    pricingInfo?: string;
    serviceAreas?: string[];
    faq?: Array<{ question: string; answer: string }>;
    aboutUs?: string;
    relatedServices?: string[];
  };
}

export default async function ServiceLocationPage({ params }: { params: { service: string, location: string } }) {
  const serviceData: ServiceLocationData | null = await getServiceLocationData(params.service, params.location);
  
  if (!serviceData) {
    return <ServiceNotFound />
  }

  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      <ServiceHeader serviceData={serviceData} />
      <Introduction serviceData={serviceData} />
      <WhyChooseUs serviceData={serviceData} />
      <OurProcess serviceData={serviceData} />
      <MaterialsAndFinishes serviceData={serviceData} />
      <ElementsWeWorkOn serviceData={serviceData} />
      <ProfessionalBenefits serviceData={serviceData} />
      <BeforeAfterGallery serviceData={serviceData} />
      <MaintenanceAndCare serviceData={serviceData} />
      <CustomerTestimonials serviceData={serviceData} />
      <FAQs serviceData={serviceData} />
      <PricingGuide serviceData={serviceData} />
      <EnvironmentalCommitment serviceData={serviceData} />
      <ServiceAreas serviceData={serviceData} />
      <ContactInformation />
    </div>
  )
}

function ServiceNotFound() {
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

function ServiceHeader({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-5xl font-bold mb-6">{serviceData.location.title}</h1>
        <p className="text-xl mb-8">{serviceData.location.localizedDescription || serviceData.description}</p>
        <QuoteModal>
          <Button size="lg" className="text-lg">Get a Free Quote</Button>
        </QuoteModal>
      </div>
      <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
        {serviceData.image && (
          <Image 
            src={serviceData.image}
            alt={serviceData.location.title}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
    </div>
  )
}

function Introduction({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <section className="space-y-12">
      <div>
        <h2 className="text-3xl font-semibold mb-6">Introduction to {serviceData.name} in {serviceData.location.title.split(' in ')[1]}</h2>
        <p className="text-lg leading-relaxed">{serviceData.location.introduction || serviceData.introduction}</p>
      </div>
      {serviceData.benefits && serviceData.benefits.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceData.benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
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
        </div>
      )}
    </section>
  )
}

function WhyChooseUs({ serviceData }: { serviceData: ServiceLocationData }) {
  const whyChooseUsData = serviceData.location.whyChooseUs || serviceData.whyChooseUs;
  return (
    <section className="bg-gray-50 p-12 rounded-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose Our {serviceData.name} Service in {serviceData.location.title.split(' in ')[1]}</h2>
      {whyChooseUsData && whyChooseUsData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyChooseUsData.map((reason, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{typeof reason === 'string' ? reason : reason.title}</CardTitle>
              </CardHeader>
              {typeof reason !== 'string' && (
                <CardContent>
                  <p>{reason.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

function OurProcess({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Process</h2>
      {serviceData.process && serviceData.process.length > 0 ? (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {serviceData.process.map((step, index) => (
            <li key={index} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-primary rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-primary-600">
                {index + 1}
              </span>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{step}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center text-lg">Our process information is currently being updated. Please check back soon.</p>
      )}
    </section>
  )
}

function MaterialsAndFinishes({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">Materials and Finishes</h2>
      {serviceData.materialsAndFinishes && serviceData.materialsAndFinishes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceData.materialsAndFinishes.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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
        <p className="text-center text-lg">Information on materials and finishes is not available at the moment.</p>
      )}
    </section>
  )
}

function ElementsWeWorkOn({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <section className="bg-gray-50 p-12 rounded-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center">Elements We Work On</h2>
      {serviceData.elementsWeSpray && serviceData.elementsWeSpray.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceData.elementsWeSpray.map((element, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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
        <p className="text-center text-lg">Information on elements we work on is not available at the moment.</p>
      )}
    </section>
  )
}

function ProfessionalBenefits({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">Benefits of Professional {serviceData.name}</h2>
      {serviceData.professionalBenefits && serviceData.professionalBenefits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceData.professionalBenefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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
        <p className="text-center text-lg">Information on benefits of professional service is not available at the moment.</p>
      )}
    </section>
  )
}

function BeforeAfterGallery({ serviceData }: { serviceData: ServiceLocationData }) {
  const validGalleryItems = serviceData.beforeAfterGallery?.filter(item => item.before && item.after) || [];
  
  if (validGalleryItems.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">Before and After Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {validGalleryItems.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative h-64">
                  <Image
                    src={item.before}
                    alt={`Before - ${item.description}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                    Before
                  </div>
                </div>
                <div className="relative h-64">
                  <Image
                    src={item.after}
                    alt={`After - ${item.description}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                    After
                  </div>
                </div>
              </div>
              <p className="p-4 text-center">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function MaintenanceAndCare({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <section className="bg-gray-50 p-12 rounded-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center">Maintenance and Care</h2>
      {serviceData.maintenanceAndCare ? (
        <Card>
          <CardHeader>
            <CardTitle>Caring for Your Sprayed Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{serviceData.maintenanceAndCare.description}</p>
            <p className="font-semibold">Longevity of the finish: {serviceData.maintenanceAndCare.longevity}</p>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center text-lg">Maintenance and care information is not available at the moment.</p>
      )}
    </section>
  )
}

function CustomerTestimonials({ serviceData }: { serviceData: ServiceLocationData }) {
  const testimonials = serviceData.location.testimonials || serviceData.customerTestimonials;
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">Customer Testimonials in {serviceData.location.title.split(' in ')[1]}</h2>
      {testimonials && testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <blockquote className="italic text-lg">&ldquo;{testimonial.text || testimonial.quote}&rdquo;</blockquote>
                <p className="mt-4 font-semibold text-right">- {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">Customer testimonials are not available at the moment.</p>
      )}    
    </section>
  )
}

function FAQs({ serviceData }: { serviceData: ServiceLocationData }) {
  const faqs = serviceData.location.faq || serviceData.faq;
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">FAQs About {serviceData.name} in {serviceData.location.title.split(' in ')[1]}</h2>
      {faqs && faqs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-lg">FAQs are not available at the moment.</p>
      )}
    </section>
  )
}

function PricingGuide({ serviceData }: { serviceData: ServiceLocationData }) {
  const pricingInfo = serviceData.location.pricingInfo || serviceData.pricingInfo;
  return (
    <section className="bg-gray-50 p-12 rounded-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center">Pricing Guide for {serviceData.location.title.split(' in ')[1]}</h2>
      {pricingInfo ? (
        <Card>
          <CardHeader>
            <CardTitle>Factors Affecting Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">{pricingInfo}</p>
            <div className="text-center">
              <QuoteModal>
                <Button size="lg">Request a Personalized Quote</Button>
              </QuoteModal>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center text-lg">Pricing information for this location is not available at the moment.</p>
      )}
    </section>
  )
}

function EnvironmentalCommitment({ serviceData }: { serviceData: ServiceLocationData }) {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Environmental Commitment in {serviceData.location.title.split(' in ')[1]}</h2>
      {serviceData.environmentalCommitment ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start mb-6">
              <Leaf className="mr-4 h-8 w-8 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Eco-Friendly Paint Options</h3>
                <p>{serviceData.environmentalCommitment.ecoFriendlyOptions}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Droplet className="mr-4 h-8 w-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Waste Reduction</h3>
                <p>{serviceData.environmentalCommitment.wasteReduction}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center text-lg">Environmental commitment information is not available at the moment.</p>
      )}
    </section>
  )
}

function ServiceAreas({ serviceData }: { serviceData: ServiceLocationData }) {
  if (!serviceData.location.serviceAreas || serviceData.location.serviceAreas.length === 0) return null;

  return (
    <section className="bg-gray-50 p-12 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Service Areas in {serviceData.location.title.split(' in ')[1]}</CardTitle>
          <CardDescription>We provide {serviceData.name} services in these areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {serviceData.location.serviceAreas.map((area) => (
              <div key={area} className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function ContactInformation() {
  return (
    <section>
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Ready to Transform Your Space?</CardTitle>
          <CardDescription className="text-primary-foreground/80">Get in touch with us today for a free consultation and quote!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mt-1">
            <QuoteModal>
              <Button size="lg" variant="secondary">Get a Free Quote</Button>
            </QuoteModal>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
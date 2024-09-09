import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceData, getAllServices } from '@/lib/data'
import { getSpecificImage } from '@/lib/unsplash'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react'

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map(service => ({ service: service.slug }))
}

export default async function Service({ params }: { params: { service: string } }) {
  console.log("Rendering service page for:", params.service);

  const allServices = await getAllServices();
  console.log("All services:", allServices);

  const serviceBasicData = allServices.find(s => s.slug === params.service);
  console.log("Service basic data:", serviceBasicData);

  const serviceDetailedData = await getServiceData(params.service);
  console.log("Service detailed data:", serviceDetailedData);
  
  if (!serviceBasicData || !serviceDetailedData) {
    console.error("Service not found. Basic data:", serviceBasicData, "Detailed data:", serviceDetailedData);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">We couldn't find the service you're looking for. It may have been moved or doesn't exist.</p>
        <Button asChild>
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    )
  }

  let serviceImage = null;
  if (serviceBasicData.imageId) {
    try {
      serviceImage = await getSpecificImage(serviceBasicData.imageId);
      console.log("Service image fetched:", serviceImage ? "success" : "failed");
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{serviceBasicData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          {serviceImage && (
            <Image 
              src={serviceImage.urls.regular}
              alt={serviceBasicData.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          )}
        </div>
        <div>
          <p className="text-lg mb-6">{serviceBasicData.description}</p>
          {serviceBasicData.subServices && (
            <Card>
              <CardHeader>
                <CardTitle>Our {serviceBasicData.name} Services Include:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceBasicData.subServices.map((subService: string) => (
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

      {/* Locations */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>We Serve These Locations</CardTitle>
            <CardDescription>Find a {serviceBasicData.name} service near you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {serviceDetailedData.locations && serviceDetailedData.locations.map((location: any) => (
                <Button key={location.slug} variant="outline" asChild className="justify-start">
                  <Link href={`/services/${params.service}/${location.slug}`}>
                    <MapPin className="mr-2 h-4 w-4" />
                    {location.title.replace(`${serviceBasicData.name} Services in `, '')}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
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
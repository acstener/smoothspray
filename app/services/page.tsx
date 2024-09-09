import React from 'react';
import Image from 'next/image';
import { getAllServices } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Paintbrush, Home, Building2, Wrench, PaintBucket } from 'lucide-react';
import QuoteModal from '@/components/QuoteModal';

const ServiceIcon = ({ name }: { name: string }) => {
  const icons = {
    'Interior Painting': <Paintbrush className="h-6 w-6" />,
    'Exterior Painting': <PaintBucket className="h-6 w-6" />,
    'Residential Services': <Home className="h-6 w-6" />,
    'Commercial Services': <Building2 className="h-6 w-6" />,
    'Maintenance': <Wrench className="h-6 w-6" />,
    'Custom Finishes': <PaintBucket className="h-6 w-6" />,
  };
  return icons[name as keyof typeof icons] || <Paintbrush className="h-6 w-6" />;
};

export default async function Services() {
  let services = [];
  try {
    console.log("Fetching services...");
    const fetchedServices = await getAllServices();
    console.log("Fetched services:", fetchedServices);
    
    if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
      services = fetchedServices;
    } else {
      console.error("Fetched services is empty or not an array:", fetchedServices);
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  if (!Array.isArray(services)) {
    console.error("Services is not an array:", services);
    services = [];
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From residential touch-ups to large-scale commercial projects, we offer a comprehensive range of painting services tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <Image
            src="https://nsdr.b-cdn.net/Project%20pics/kam-idris-hYb7kbu4x7E-unsplash.jpg"
            alt="Painting services"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Our Services?</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              30+ years of experience in general contracting
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Specialized painting expertise
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              State-of-the-art spraying facility for efficient work
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Competitive pricing without compromising quality
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Tailored solutions for both residential and commercial projects
            </li>
          </ul>
        </div>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p>No services available at the moment. Please check back later.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ServiceIcon name={service.name} />
                  <span className="ml-2">{service.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardContent>
                <Button asChild className="w-full">
                  <a href={`/services/${service.slug}`}>Learn More</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Transform Your Space?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Contact us today for a free consultation and quote. Let's bring your vision to life!
        </p>
        <QuoteModal>
          <Button size="lg">Get a Free Quote</Button>
        </QuoteModal>
      </div>
    </div>
  );
}
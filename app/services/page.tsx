import React from 'react';
import Link from 'next/link';
import { getAllServices } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      {services.length === 0 ? (
        <p>No services available at the moment. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col">
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/services/${service.slug}`}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
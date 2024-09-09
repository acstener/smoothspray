import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllServices } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from 'lucide-react'
import QuoteModal from '@/components/QuoteModal'

interface Service {
  slug: string;
  name: string;
  description: string;
}

export default async function Home() {
  const services = await getAllServices();

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Transform Your Space with Expert Spray Painting</h1>
          <p className="text-xl text-muted-foreground mb-6">
            With over 30 years of experience in general contracting, we bring unparalleled expertise to every painting project.
          </p>
          <QuoteModal>
            <Button size="lg">Get a Free Quote</Button>
          </QuoteModal>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="https://nsdr.b-cdn.net/Project%20pics/r-architecture-CCjAPxoQWgQ-unsplash.jpg"
            alt="Spray painting service"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover max-h-[500px] w-full"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "30+ years of experience",
            "State-of-the-art spraying facility",
            "Competitive pricing",
            "Expert color consultation",
            "Eco-friendly options",
            "Timely project completion"
          ].map((feature, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <p>{feature}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Premium Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((service: Service) => (
              <Card key={service.slug} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No services available at the moment. Please check back later.
            </p>
          )}
        </div>
      </section>

      <section className="mb-16">
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground">
                Get in touch with us for a free consultation and quote.
              </p>
            </div>
            <QuoteModal>
              <Button size="lg" className="mt-4 md:mt-0">Get a Free Quote</Button>
            </QuoteModal>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceData, getLocations, getAllServices } from '@/lib/data'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Phone, Mail, CheckCircle, Droplet, Leaf, Clock, PaintBucket, Star } from 'lucide-react'

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map(service => ({ service: service.slug }))
}

export default function Service({ params }: { params: { service: string } }) {
  const serviceData = getServiceData(params.service)
  const locations = getLocations()

  if (!serviceData) {
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

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{serviceData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          {serviceData.image && (
            <Image 
              src={serviceData.image} 
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
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Introduction to Kitchen Spraying</h2>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Cost-effective', 'Transformative', 'Eco-friendly'].map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {benefit}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Kitchen Spraying */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Why Choose Kitchen Spraying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Time-Saving</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Environmental Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Kitchen Spraying Process */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Kitchen Spraying Process</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>Preparation: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Spraying: Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</li>
          <li>Finishing Touches: Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</li>
        </ol>
        <p className="mt-4">Estimated timeline: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>

      {/* Materials and Finishes */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Materials and Finishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Paint Types</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>Lorem ipsum dolor</li>
                <li>Consectetur adipiscing</li>
                <li>Nullam in dui mauris</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Durability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Color Options</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Before and After Gallery */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Before and After Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src={`/placeholder.svg?text=Before+and+After+${item}`}
                    alt={`Before and After ${item}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">FAQs About Kitchen Spraying</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardHeader>
                <CardTitle>Question {item}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Kitchen Elements We Spray */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Kitchen Elements We Spray</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Cabinets', 'Drawers', 'Islands', 'Appliances'].map((element, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PaintBucket className="mr-2 h-5 w-5 text-blue-500" />
                  {element}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits of Professional Kitchen Spraying */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Benefits of Professional Kitchen Spraying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Even Finish</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Expert Color Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Proper Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Maintenance and Care */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Maintenance and Care</h2>
        <Card>
          <CardHeader>
            <CardTitle>Caring for Your Sprayed Kitchen</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
            <p className="mt-2">Longevity of the finish: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CardContent>
        </Card>
      </section>

      {/* Customer Testimonials */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <Card key={item}>
              <CardContent className="pt-6">
                <blockquote className="italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
                </blockquote>
                <p className="mt-2 font-semibold">- Customer {item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button className="mt-4" asChild>
          <Link href="/case-studies">View Detailed Case Studies</Link>
        </Button>
      </section>

      {/* Pricing Guide */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Pricing Guide</h2>
        <Card>
          <CardHeader>
            <CardTitle>Factors Affecting Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Kitchen size</li>
              <li>Number of cabinets and drawers</li>
              <li>Type of finish selected</li>
              <li>Additional elements (e.g., islands, appliances)</li>
            </ul>
            <Button className="mt-4">Request a Quote</Button>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Why Choose Us for Kitchen Spraying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Experience & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quality Guarantees</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customer Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environmental Commitment */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Environmental Commitment</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start mb-4">
              <Leaf className="mr-4 h-6 w-6 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Eco-Friendly Paint Options</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Droplet className="mr-4 h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Waste Reduction</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Locations */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>We Serve These Locations</CardTitle>
            <CardDescription>Find a Spray Painter service near you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {locations.map(location => (
                <Button key={location.slug} variant="outline" asChild className="justify-start">
                  <Link href={`/services/${params.service}/${location.slug}`}>
                    <MapPin className="mr-2 h-4 w-4" />
                    {location.name}
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
            <CardTitle>Ready to Transform Your Kitchen?</CardTitle>
            <CardDescription>Get in touch with us today for a free consultation and quote!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>Call us: (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>Email: info@kitchenspraying.com</span>
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
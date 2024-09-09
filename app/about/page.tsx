import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import QuoteModal from '@/components/QuoteModal'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-2">About Smooth Spray</h1>
      <p className="text-xl text-center text-muted-foreground mb-12">Bringing decades of expertise to your painting projects</p>
      
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
        <Image
          src="https://nsdr.b-cdn.net/Project%20pics/simon-kadula-2ovBrbfQr0Y-unsplash%20(2).jpg"
          alt="Smooth Spray facility"
          width={600}
          height={400}
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
        
        <div className="space-y-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge variant="secondary" className="mr-2">30+ Years</Badge>
                Building Excellence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Since the early 1990s, Smooth Spray has been a trusted name in Bromley and Beckenham, delivering high-quality building and renovation services. Our commitment to craftsmanship and customer satisfaction has been the foundation of our success. We also operate <a href="https://couttsbuilding.co.uk/" className="text-primary hover:underline">Coutts Building</a>, showcasing our expertise in the construction industry.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specialized Painting Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Building on our extensive experience in general contracting, we've honed our skills to specialize in painting services. This focused expertise allows us to bring a unique blend of broad construction knowledge and specialized painting techniques to every project we undertake.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Versatile Project Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our experience spans a wide range of projects and clients. From quaint residential touch-ups to expansive commercial renovations, we approach each job with the same level of dedication and expertise. Our versatility ensures that no project is too big or too small for the Smooth Spray team.
            </p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Cutting-Edge Spraying Facility</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At the heart of our operations lies our state-of-the-art spraying facility. This advanced setup empowers us to handle jobs with unprecedented speed and efficiency. The result? Competitive pricing for our clients without any compromise on the superior quality we're known for.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-16 border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>The Smooth Spray Advantage</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Decades of general contracting experience informing our specialized painting services</li>
            <li>A deep understanding of building structures and materials</li>
            <li>Efficient processes that save time and money without sacrificing quality</li>
            <li>A commitment to using the best materials and techniques for long-lasting results</li>
            <li>A customer-first approach, ensuring your vision is at the forefront of every project</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Space?</h2>
        <p className="text-muted-foreground mb-6">
          Let our 30+ years of construction and painting expertise bring your vision to life. Contact us today to discuss your project and experience the Smooth Spray difference.
        </p>
        <QuoteModal>
          <Button variant="default">Get a Quote</Button>
        </QuoteModal>
      </div>
    </div>
  )
}
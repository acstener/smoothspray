import React from 'react';
import Link from 'next/link';
import { getAllServices } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function Home() {
	const services = await getAllServices();

	return (
		<main className="container mx-auto px-4 py-16">
			<h1 className="text-4xl font-bold mb-8">Welcome to Our Spray Painting Services</h1>
			<section className="mb-12">
				<h2 className="text-3xl font-bold mb-6">Our Premium Services</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.length > 0 ? (
						services.map((service) => (
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
						))
					) : (
						<p>No services available at the moment. Please check back later.</p>
					)}
				</div>
			</section>
			{/* Add more sections as needed */}
		</main>
	);
}
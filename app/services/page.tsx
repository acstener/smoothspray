import React from 'react';
import Link from 'next/link';
import { getAllServices } from '@/lib/data';

export default function Services() {
  const services = getAllServices();
  console.log("Services data:", services); // Debugging log

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`} className="block p-4 border rounded hover:bg-gray-100">
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="mt-2">{service.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
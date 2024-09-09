import React from 'react';
import Link from 'next/link';

export default function Gallery() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      <ul className="space-y-4">
        <li><Link href="/gallery/before-after" className="text-blue-600 hover:underline">Before and After</Link></li>
        <li><Link href="/gallery/project-showcase" className="text-blue-600 hover:underline">Project Showcase</Link></li>
      </ul>
    </div>
  );
}
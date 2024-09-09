import React from 'react';

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog Post: {params.slug}</h1>
      {/* Add more content here */}
    </div>
  );
}
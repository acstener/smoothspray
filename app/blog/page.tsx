import React from 'react';
import Link from 'next/link';

export default function Blog() {
  const posts = [
    { slug: 'post-1', title: 'Blog Post 1' },
    { slug: 'post-2', title: 'Blog Post 2' },
    { slug: 'post-3', title: 'Blog Post 3' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
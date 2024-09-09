import React from 'react';
import Link from 'next/link';

export default function FAQ() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <ul className="space-y-4">
        <li><Link href="/faq/general" className="text-blue-600 hover:underline">General FAQ</Link></li>
        <li><Link href="/faq/service-specific" className="text-blue-600 hover:underline">Service-Specific FAQ</Link></li>
      </ul>
    </div>
  );
}
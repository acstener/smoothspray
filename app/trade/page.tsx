import React from 'react';
import Link from 'next/link';

export default function TradeServices() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Trade Services</h1>
      <ul className="space-y-4">
        <li><Link href="/trade/commercial-projects" className="text-blue-600 hover:underline">Commercial Projects</Link></li>
        <li><Link href="/trade/bulk-orders" className="text-blue-600 hover:underline">Bulk Orders</Link></li>
        <li><Link href="/trade/trade-partnerships" className="text-blue-600 hover:underline">Trade Partnerships</Link></li>
        <li><Link href="/trade/training-workshops" className="text-blue-600 hover:underline">Training Workshops</Link></li>
      </ul>
    </div>
  );
}
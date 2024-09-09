import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">Spray Painter</Link>
        <nav className="hidden md:flex space-x-4">
          {["Services", "About", "Process", "Pricing", "Gallery", "Blog", "Contact", "FAQ", "Trade"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-gray-600 hover:text-green-600">
              {item}
            </Link>
          ))}
        </nav>
        <Button asChild>
          <Link href="/get-a-quote">Get a Quote</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleTags from '@/components/GoogleTags';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GoogleTags />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto py-8 px-4 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
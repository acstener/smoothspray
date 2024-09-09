"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Phone } from "lucide-react"

export default function QuoteModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = "+44 7860 226411" // Replace with your actual phone number

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Get a Free Quote</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          <a
            href={`tel:${phoneNumber}`}
            className="text-xl font-bold text-primary hover:underline flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <Phone className="mr-2 h-5 w-5" />
            {phoneNumber}
          </a>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Contact us by phone for a free quote on our services.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
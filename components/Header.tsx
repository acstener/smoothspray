import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import QuoteModal from '@/components/QuoteModal'

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-primary">Smooth</span>
          <span>spray</span>
          <span className="text-primary">.co.uk</span>
        </Link>
        <div className="flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <Link href="/services" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <QuoteModal>
            <Button variant="default">Get a Quote</Button>
          </QuoteModal>
        </div>
      </div>
    </header>
  )
}

export default Header
import Link from "next/link";
import { getServerSession } from "next-auth";
import { Scissors, Home, ShoppingBag, Info, Phone, MapPin, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import NavButtons from "./NavButtons";
import NavSheet from "./NavSheet";
import { SheetContent, SheetTrigger } from "../ui/sheet";
import NavMenuButtons from "./NavMenuButtons";
import NavLinks from "./NavLinks";
import DropDownItems from "./DropDownItems";
import NavMenuLinks from "./NavMenuLinks";

export const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/about", icon: Info, label: "About" },
  { href: "/contact", icon: Phone, label: "Contact" },
  { href: "https://www.google.com/maps/place/Q236%2B3R4,+PR+Colony,+Mahbubnagar,+Telangana+509001/@16.7526888,78.0120699,21z/data=!4m14!1m7!3m6!1s0x3bca2961051592e5:0x5e52598e4200778!2sSri+Laxmi+Venkateshwara+Electrical+Works!8m2!3d16.7524833!4d78.0120994!16s%2Fg%2F11q26m4k8y!3m5!1s0x3bca28a90c1d32e7:0x30416577710595bb!8m2!3d16.7526573!4d78.0120579!16s%2Fg%2F11sh63fbw7?entry=ttu", icon: MapPin, label: "Directions" },
];


export default async function Navbar() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log(session.user)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-[5px] border-b shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Scissors className="h-6 w-6 text-gray-600" />
              <span className="text-2xl font-semibold text-gray-600">TLRS</span>
            </Link>
            <div className="hidden mid:flex mid:items-center mid:space-x-4">
              <NavLinks/>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {session? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    
                  <div className="inline-flex items-center justify-center rounded-full bg-gray-200 p-0.5">
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage 
                          src={session.user.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} 
                          alt={session.user.name || "User"} 
                        />
                        <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                  </div>

                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="text-sm font-medium">Signed in as</div>
                    <div className="text-xs text-gray-500 truncate w-full">{session.user.email}</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropDownItems />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavButtons />
            )}
            <NavSheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 mid:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <NavMenuLinks />
                  {!session?.user && <NavMenuButtons />}
                </nav>
              </SheetContent>
            </NavSheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

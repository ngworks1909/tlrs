import Link from "next/link";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <input
                className="h-10 w-10 rounded-full"
                type="image"
                src="https://firebasestorage.googleapis.com/v0/b/tlrs-893dc.appspot.com/o/logo.png?alt=media&token=e32751af-93b0-44ca-b42d-0dbc0e8cfe00"
                alt="TLRS Logo"
              />
              <span className="text-2xl font-bold text-gray-800">TLRS</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Providing quality tailoring services since 2012. We bring your fashion ideas to life.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                <FaXTwitter size={20} className="text-gray-600 hover:text-gray-800 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <FaInstagram size={20} className="text-gray-600 hover:text-gray-800 transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {2024} TLRS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
import Link from "next/link";

export default function footer() {
  return (
    <footer className="bg-emerald-600 text-gray-100 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">About Us</h3>
            <p className="text-sm">
              An online store offering the best products at the best prices with
              a safe and easy shopping experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-yellow-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-yellow-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-yellow-200">
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Contact Us
            </h3>
            <p className="text-sm">Email: support@example.com</p>
            <p className="text-sm">Phone: +201234567890</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-green-500 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

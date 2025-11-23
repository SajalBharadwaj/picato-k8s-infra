import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-primary-500 mb-4">PICATO</h3>
            <p className="text-gray-400 mb-4">Delicious Burgers and Pizzas delivered to your doorstep.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#menu" className="text-gray-400 hover:text-white transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Food Street</li>
              <li>Tasty City, TC 90210</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@picato.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-none text-white px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition">Go</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; 2025 PICATO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

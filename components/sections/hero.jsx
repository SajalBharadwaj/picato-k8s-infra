import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Welcome to PICATO</h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Delicious Burgers and Pizzas Delivered Straight to Your Door in Minutes
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/menu"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              View Menu
            </Link>
            <Link
              href="/about"
              className="inline-block bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-900 transition shadow-lg"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

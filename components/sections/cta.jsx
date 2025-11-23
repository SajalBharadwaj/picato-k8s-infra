import Link from "next/link"

export default function CTA() {
  return (
    <div className="bg-primary-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Order?</h2>
        <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
          Skip the line and order your favorite food online. Fresh, hot, and delicious!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Order Now
          </Link>
          <button className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/10 transition">
            Download App
          </button>
        </div>
      </div>
    </div>
  )
}


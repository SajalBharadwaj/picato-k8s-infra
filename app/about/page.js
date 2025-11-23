export default function AboutHero() {
    const items = [
    {
      title: "Partnership",
      image: "https://images.unsplash.com/photo-1722152667178-be659e54bffc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Craftsmanship",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Excellence",
      image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]



  return (
    <>
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Fallback if image doesn't load/exist */}
        <div className="w-full h-full bg-gray-800">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-full object-cover opacity-60"
            alt="Restaurant Interior"
          />
        </div>
      </div>

      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-4xl leading-tight tracking-tight">
          PICATO is a catalyst for culinary innovation in the world of flavors.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl font-light">
          Redefining the dining experience through sustainable practices and exquisite taste.
        </p>
      </div>
    </div>
       <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-16">Our core principles</h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Card 1 */}
          <div className="border-t border-gray-200 pt-8 group hover:border-primary-600 transition-colors duration-300">
            <span className="block text-8xl font-light text-gray-900 mb-8 group-hover:text-primary-600 transition-colors duration-300">
              1
            </span>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sourcing with Integrity</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We accompany local farmers in their transition towards sustainable agriculture. Every ingredient tells a
              story of responsibility and quality, ensuring the best flavors for our customers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border-t border-gray-200 pt-8 group hover:border-primary-600 transition-colors duration-300">
            <span className="block text-8xl font-light text-gray-900 mb-8 group-hover:text-primary-600 transition-colors duration-300">
              2
            </span>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Innovating Tradition</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Valuing innovation through our culinary techniques. We propose modern solutions to classic recipes,
              blending the comfort of tradition with the excitement of the new.
            </p>
          </div>
        </div>
      </div>
    </div>
     <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16 max-w-4xl mx-auto leading-tight">
          Combining innovation, sustainability, and efficiency
        </h2>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-w-4 aspect-h-1 md:aspect-h-1 max-h-90">
            <img src="https://images.unsplash.com/photo-1611657365907-1ca5d9799f59?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chef preparing food" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                "Picato aims to be a key player in the food transition. We offer sustainable solutions serving the
                tastes of tomorrow."
              </p>
              <button className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors duration-300">
                Our Commitment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 leading-tight">
          A global approach <br />
          for a future model
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="group relative h-[500px] rounded-xl overflow-hidden cursor-pointer">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>

              <div className="absolute top-6 right-6">
                <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      <div className="py-24 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Let's talk about your project</h2>
        <p className="text-xl text-gray-600 mb-10">
          Whether you need catering, a reservation, or just want to say hello.
        </p>
        <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-primary-600 transition-colors duration-300">
          Contact Us
        </button>
      </div>
    </div>
</>
  )
}

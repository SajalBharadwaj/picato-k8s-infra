export default function About() {
  return (
    <div id="about" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1651977560788-98792cd34da0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Chef"
              className="relative z-10 rounded-lg shadow-xl w-full"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-100 rounded-full z-0"></div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story of Flavor</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2015, PICATO started with a simple mission: to serve the best burgers and pizzas in town using
              only the freshest, locally sourced ingredients.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that great food brings people together. That's why we put love and care into every dish we
              prepare, from our hand-tossed pizza dough to our house-made burger sauces.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="text-4xl font-bold text-primary-600 mb-2">10k+</h4>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-primary-600 mb-2">50+</h4>
                <p className="text-gray-600">Menu Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

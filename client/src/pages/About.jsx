export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pink-800">
            Welcome to <span className="text-yellow-600">Havenly Homes</span>
          </h1>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-pink-700 max-w-3xl mx-auto">
            We believe a home is more than walls and a roof — it’s the place where your life unfolds, your dreams grow, and your happiest memories are made.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-pink-800">
              Our <span className="text-yellow-600">Story</span>
            </h2>
            <p className="text-pink-700 leading-relaxed">
              Havenly Homes started with one simple mission — to make finding your perfect home as joyful as living in it. 
              We saw too many people lost in endless listings, overwhelmed by paperwork, and unsure if they were making the right choice.
            </p>
            <p className="text-pink-700 leading-relaxed">
              So we built a service that blends smart technology with a human touch — helping you discover spaces that feel right the moment you walk in.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-yellow-100 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative h-80 bg-yellow-600 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1470&q=80" 
                alt="Cozy home" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-pink-800 mb-8 text-center">
            What Makes Us <span className="text-yellow-600">Different</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "We Listen",
                description: "Before showing you a single property, we learn your story, your needs, and your dreams.",
                icon: "👂"
              },
              {
                title: "We Guide",
                description: "From first viewing to final handshake, we’re right there with advice you can trust.",
                icon: "🗺️"
              },
              {
                title: "We Care",
                description: "For us, it’s never just a deal — it’s about helping you find your happy place.",
                icon: "💛"
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-pink-50 p-6 rounded-lg hover:bg-yellow-50 transition duration-300 border border-pink-200 hover:border-yellow-200"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-pink-800 mb-2">{value.title}</h3>
                <p className="text-pink-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl font-semibold text-pink-800 mb-8 text-center">
            Why Choose <span className="text-yellow-600">Havenly Homes</span>
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                title: "Heart + Technology",
                description: "We use smart search tools but never forget the human connection."
              },
              {
                title: "Less Stress, More Joy",
                description: "We simplify the process so you can focus on imagining your new life."
              },
              {
                title: "From Houses to Homes",
                description: "We don’t just find you a place — we help you start your next chapter."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2 mr-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-pink-700">
                  <span className="font-semibold">{item.title}:</span> {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Battery, BatteryCharging as ChargingPod, Clock, MapPin, Shield, Wrench } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80"
            alt="Electric car charging"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
           Hi Smart Solutions for EV Challenges
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-8">
            We provide innovative solutions to make your electric vehicle experience seamless and worry-free
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors">
            Explore Solutions
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Battery className="w-8 h-8" />}
              title="Battery Health Monitoring"
              description="Real-time monitoring and diagnostics of your EV battery to ensure optimal performance and longevity."
            />
            <ServiceCard
              icon={<ChargingPod className="w-8 h-8" />}
              title="Charging Solutions"
              description="Access to our network of fast-charging stations and home charging installation services."
            />
            <ServiceCard
              icon={<MapPin className="w-8 h-8" />}
              title="Range Planning"
              description="Smart route planning tools to eliminate range anxiety and optimize your journeys."
            />
            <ServiceCard
              icon={<Clock className="w-8 h-8" />}
              title="24/7 Support"
              description="Round-the-clock assistance for all your EV-related concerns and emergencies."
            />
            <ServiceCard
              icon={<Wrench className="w-8 h-8" />}
              title="Maintenance Services"
              description="Specialized EV maintenance and repair services by certified technicians."
            />
            <ServiceCard
              icon={<Shield className="w-8 h-8" />}
              title="Insurance Solutions"
              description="Tailored insurance packages specifically designed for electric vehicles."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your EV Experience?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied EV owners who have already benefited from our solutions.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EV Solutions</h3>
            <p className="text-gray-400">
              Making electric mobility accessible and worry-free for everyone.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Battery Management</li>
              <li>Charging Solutions</li>
              <li>Route Planning</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-green-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;
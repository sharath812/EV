import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Battery, BatteryCharging as ChargingPod, Clock, MapPin, Shield, Wrench, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

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
            Smart Solutions for EV Challenges
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-8">
            Manage your electric vehicle fleet with comprehensive tracking, charging history, and performance analytics
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors inline-flex items-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your EV Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From battery monitoring to charging history, our platform provides comprehensive tools for electric vehicle management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Battery className="w-8 h-8" />}
              title="Battery Health Monitoring"
              description="Real-time monitoring and diagnostics of your EV battery to ensure optimal performance and longevity."
            />
            <FeatureCard
              icon={<ChargingPod className="w-8 h-8" />}
              title="Charging History"
              description="Track all your charging sessions with detailed cost analysis and energy consumption data."
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Range Tracking"
              description="Monitor your vehicle's range and efficiency to optimize your driving patterns and routes."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Performance Analytics"
              description="Detailed insights into your vehicle's performance, efficiency, and usage patterns."
            />
            <FeatureCard
              icon={<Wrench className="w-8 h-8" />}
              title="Vehicle Management"
              description="Comprehensive vehicle profiles with specifications, maintenance records, and status tracking."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Private"
              description="Your vehicle data is encrypted and secure, with complete control over your privacy settings."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your EV Experience?</h2>
          <p className="text-xl mb-8">
            Join thousands of EV owners who are already managing their vehicles more efficiently with our platform.
          </p>
          {user ? (
            <Link
              to="/dashboard"
              className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
          )}
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
            <h3 className="text-xl font-bold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Battery Management</li>
              <li>Charging History</li>
              <li>Performance Analytics</li>
              <li>Vehicle Tracking</li>
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
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-green-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;
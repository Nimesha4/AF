import React from 'react';

import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div>
      <div className="relative bg-gradient-to-br from-slate-900 to-indigo-100 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              About TravelWorld
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Discover our story and mission to help you explore the world's most beautiful destinations.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-br from-slate-900 to-indigo-100 text-white"></div>
      </div>

      {/* Our story section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Founded in 2018, TravelWorld began with a simple vision: to make the world more accessible to everyone. What started as a small blog documenting our own travel experiences has grown into a comprehensive platform connecting travelers with authentic experiences across the globe.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our team of passionate travelers and local experts work tirelessly to curate the best destinations, accommodations, and experiences that showcase the unique culture and beauty of each country.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-300">
                {/* Replace with an actual image in production */}
                <div className="flex items-center justify-center h-64 bg-gray-200 text-gray-500">
                  [Team Image]
                </div>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-500 italic">
                  The TravelWorld team on our annual retreat in Bali, Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              These core principles guide everything we do at TravelWorld.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Value 1 */}
            <div className="bg-gray-50 rounded-lg p-6 border-t-4 border-indigo-500 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Authenticity</h3>
              <p className="text-gray-600">
                We believe in authentic travel experiences that respect local cultures and showcase the true essence of each destination.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-gray-50 rounded-lg p-6 border-t-4 border-purple-500 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We promote responsible tourism practices that protect the environment and benefit local communities.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-gray-50 rounded-lg p-6 border-t-4 border-pink-500 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                We strive to make travel accessible to everyone, regardless of background, ability, or budget.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
          Meet Our Team
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 text-center">
          Our diverse team of travel enthusiasts is dedicated to helping you discover the world.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden bg-gray-200">
              {/* Replace with actual team member photo */}
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Sarah Johnson</h3>
            <p className="text-indigo-600">Founder & CEO</p>
            <p className="mt-2 text-gray-500">
              Travel enthusiast with a passion for sustainable tourism.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden bg-gray-200">
              {/* Replace with actual team member photo */}
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Michael Chen</h3>
            <p className="text-indigo-600">Head of Destinations</p>
            <p className="mt-2 text-gray-500">
              Former tour guide with expertise in Asian and European travel.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="mx-auto h-40 w-40 rounded-full overflow-hidden bg-gray-200">
              {/* Replace with actual team member photo */}
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Elena Rodriguez</h3>
            <p className="text-indigo-600">Customer Experience</p>
            <p className="mt-2 text-gray-500">
              Dedicated to creating memorable journeys for our travelers.
            </p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-100 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to explore the world?</span>
            <span className="block text-indigo-200">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Sign Up
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default About;
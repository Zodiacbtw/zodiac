import React from 'react';
import { Target, Eye, HeartHandshake, Users, ShoppingBag } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col space-y-12 md:space-y-20">
      <section className="text-center py-10 md:py-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ShoppingBag size={48} className="text-white mx-auto mb-4" strokeWidth={1.5}/>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            About Zodiac
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-indigo-100 lg:mx-auto">
            Discover the story behind our passion for fashion and our commitment to bringing you the best in style and quality.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2025, Zodiac started with a simple idea: to make high-quality, stylish fashion accessible to everyone. We believe that what you wear is a powerful form of self-expression, and we're here to provide you with the pieces that make you feel confident and unique.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From a small boutique to a thriving online store, our journey has been driven by our love for design, our dedication to craftsmanship, and our amazing community of customers. We are constantly exploring new trends and timeless classics to curate a collection that inspires.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://plus.unsplash.com/premium_photo-1683121266311-04c92a01f5e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZhc2hpb258ZW58MHx8MHx8fDA%3D"
              alt="Our Fashion Workshop"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-16 rounded-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
            <div className="flex flex-col items-center p-6">
              <Target size={40} className="text-blue-600 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To empower individuals through fashion by offering unique, high-quality apparel and accessories that inspire confidence and self-expression.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Eye size={40} className="text-blue-600 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To be a leading global fashion destination recognized for its innovative designs, exceptional quality, and commitment to customer satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <HeartHandshake size={40} className="text-blue-600 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Creativity, Quality, Customer Focus, Integrity, and Inclusivity. These core principles guide everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Users size={40} className="text-indigo-600 mx-auto mb-4" strokeWidth={1.5}/>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Meet Our Passionate Team
          </h2>
          <p className="text-gray-600 mb-6">
            The driving force behind Zodiac is our talented and dedicated team. Get to know the people who make it all happen.
          </p>
          <a
            href="/team"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md text-base transition-colors shadow-md hover:shadow-lg"
          >
            Meet The Team
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
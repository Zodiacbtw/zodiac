import React from 'react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const promoCardsData = [
    {
      id: 1,
      accentText: 'SUMMER 2020',
      title: '-30% Discount',
      description: 'We know how large objects will act, but things on a small scale.',
      linkText: 'Read More',
      bgColor: 'bg-zinc-800',
      textColor: 'text-white',
      accentColor: 'text-gray-400',
      linkColor: 'text-white hover:underline',
    },
    {
      id: 2,
      title: 'Job Security',
      description: 'We know how large objects will act, but things on a small scale, blah blah blah, more text to make it longer.',
      linkText: 'Read More',
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      accentColor: 'text-blue-600',
      linkColor: 'text-blue-600 hover:underline',
    },
    {
      id: 3,
      accentText: 'SUMMER 2020',
      title: "IT'S A SPECIAL GIFT",
      description: 'We know how large objects will act, but things on a small scale.',
      linkText: 'SHOP NOW',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-800',
      accentColor: 'text-pink-600',
      linkColor: 'text-pink-700 hover:underline font-semibold',
    },
  ];

  return (
    <div className="flex flex-col space-y-10 md:space-y-16">
      <section>
        <Slider />
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {promoCardsData.map((card) => (
            <ProductCard
              key={card.id}
              accentText={card.accentText}
              title={card.title}
              description={card.description}
              linkText={card.linkText}
              bgColor={card.bgColor}
              textColor={card.textColor}
              accentColor={card.accentColor}
              linkColor={card.linkColor}
            />
          ))}
        </div>
      </section>

      <section className="bg-blue-50 p-6 md:p-10 lg:p-12 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="md:w-1/2 lg:w-2/5">
            <div className="w-full h-64 md:h-80 bg-blue-200 rounded-md flex items-center justify-center">
              <span className="text-blue-500">Image Placeholder</span>
            </div>
          </div>
          <div className="md:w-1/2 lg:w-3/5">
            <p className="text-xs font-semibold uppercase text-blue-600 mb-2">NEW PRODUCTS</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Product Care and Tools
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                 <a href="#" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded text-sm transition-colors text-center">
                    Read More
                </a>
                <a href="#" className="inline-block border border-green-500 text-green-600 hover:bg-green-50 font-semibold py-2.5 px-6 rounded text-sm transition-colors text-center">
                    Learn More
                </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
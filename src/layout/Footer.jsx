import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Resources copyright :
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>Pictures : <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">unsplash.com</a></li>
              <li>Illustrations : <a href="https://undraw.co" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">undraw.co</a></li>
              <li>Icons : <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">lucide.dev</a></li>
              <li>Fonts : <a href="https://fonts.google.com/specimen/Montserrat" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Montserrat</a></li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Contact :
            </h3>
            <div className="space-y-1.5 text-sm">
                <p>
                    Discover More Inspiring Design on 👇<br/>
                    <a href="https://zodiacse-commerce.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    https://zodiacse-commerce.vercel.app
                    </a>
                </p>
                <p>
                    If you have a request for more ui elements for this Ui Kit? Send us an email on 👇<br/>
                    <a href="mailto:hello@zodiac.com" className="text-blue-600 hover:underline font-medium">
                    hello@zodiac.com
                    </a>
                </p>
                <p>We will add it on future updates free of charges.</p>
            </div>
          </div>
          <div className="flex-shrink-0 md:self-end">
             <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded font-bold text-xl">FL</div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-10 pt-6 border-t border-gray-200">
          © {new Date().getFullYear()} Zodiac. Figma Design by Zodiac.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
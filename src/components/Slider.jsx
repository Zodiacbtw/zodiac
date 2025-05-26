import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';


const slidesData = [
  {
    id: 1,
    imagePlaceholder: 'bg-blue-500',
    subtitle: 'SUMMER 2025',
    title: 'NEW COLLECTION',
    description: 'Our new summer collection is ready and steady for you.',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop',
    textAlign: 'text-left',
    contentPosition: 'items-start'
  },
  {
    id: 2,
    imagePlaceholder: 'bg-pink-400',
    subtitle: 'SUMMER 2025',
    title: "IT'S A SPECIAL GIFT",
    description: 'Very special gift for you and you only.',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop/special',
    textAlign: 'text-left',
    contentPosition: 'items-start'
  },
];

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      effect="fade"
      className="w-full h-[30rem] md:h-[35rem] lg:h-[40rem] rounded-lg overflow-hidden"
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id} className={`relative ${slide.imagePlaceholder} bg-cover bg-center`}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center ${slide.contentPosition} ${slide.textAlign}`}>
            <div className="max-w-md lg:max-w-lg xl:max-w-xl text-white p-4 md:p-0">
              {slide.subtitle && <p className="text-sm md:text-base font-medium uppercase tracking-wider mb-2 md:mb-3">{slide.subtitle}</p>}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">{slide.title}</h2>
              {slide.description && <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">{slide.description}</p>}
              {slide.buttonText && (
                <a
                  href={slide.buttonLink}
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded text-sm sm:text-base transition-colors"
                >
                  {slide.buttonText}
                </a>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
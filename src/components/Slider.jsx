import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

const slidesData = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Stylish woman in a new collection outfit',
    subtitle: 'SUMMER 2025',
    title: 'NEW COLLECTION',
    description: 'Our new summer collection is ready and steady for you.',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop',
    textAlign: 'text-left',
    contentPosition: 'items-start',
    textColor: 'text-white',
    overlayColor: 'bg-black bg-opacity-40'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1400&q=80', // Farklı bir moda görseli
    imageAlt: 'Fashionable person showcasing a special gift item',
    subtitle: 'SUMMER 2025',
    title: "IT'S A SPECIAL GIFT",
    description: 'Very special gift for you and you only.',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop',
    textAlign: 'text-left',
    contentPosition: 'items-start',
    textColor: 'text-white',
    overlayColor: 'bg-black bg-opacity-30'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Woman in trendy summer outfit',
    subtitle: 'TRENDING NOW',
    title: 'SUMMER ESSENTIALS',
    description: 'Get ready for the sun with our latest summer styles.',
    buttonText: 'DISCOVER MORE',
    buttonLink: '/shop',
    textAlign: 'text-left',
    contentPosition: 'items-start',
    textColor: 'text-white',
    overlayColor: 'bg-black bg-opacity-35'
  }
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
        delay: 6000,
        disableOnInteraction: false,
      }}
      effect="fade"
      fadeEffect={{
        crossFade: true
      }}
      className="w-full h-[calc(100vh-10rem)] min-h-[30rem] max-h-[45rem] md:h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] rounded-lg overflow-hidden" // Yüksekliği viewport'a göre ayarla ama min/max sınırlar koy
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id} className="relative">
          <img
            src={slide.imageUrl}
            alt={slide.imageAlt || slide.title}
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
          {slide.overlayColor && <div className={`absolute inset-0 ${slide.overlayColor} -z-[5]`}></div>}

          <div className={`container mx-auto px-6 sm:px-10 lg:px-16 h-full flex flex-col justify-center ${slide.contentPosition} ${slide.textAlign} relative z-10`}>
            <div className="max-w-lg lg:max-w-xl xl:max-w-2xl">
              {slide.subtitle && (
                <p className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 ${slide.textColor} opacity-90`}>
                  {slide.subtitle}
                </p>
              )}
              <h2
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 md:mb-4 leading-tight ${slide.textColor}  `}
              >
                {slide.title}
              </h2>
              {slide.description && (
                <p className={`text-base sm:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed ${slide.textColor} opacity-90 max-w-md`}>
                  {slide.description}
                </p>
              )}
              {slide.buttonText && (
                <a
                  href={slide.buttonLink}
                  className={`inline-block bg-green-500 hover:bg-green-600 ${slide.textColor} font-semibold py-3 px-7 sm:py-3.5 sm:px-9 rounded text-sm sm:text-base transition-colors shadow-md hover:shadow-lg`}
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
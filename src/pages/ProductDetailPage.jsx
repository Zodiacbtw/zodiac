import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const sampleProducts = [
  {
    id: 'premium-t-shirt',
    tag: 'NEW',
    tagColor: 'bg-red-500 text-white',
    title: 'Premium T-Shirt',
    price: '$29.99',
    oldPrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Experience unparalleled comfort and style with our Premium T-Shirt. Made from 100% high-quality combed cotton, this t-shirt offers a soft feel and a perfect fit. Ideal for everyday wear, it features a classic crew neck and durable stitching. Available in various colors to match your unique style.',
    rating: 4.5,
    reviews: 120,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF', ringColor: 'ring-gray-300' },
        { name: 'Blue', hex: '#3B82F6' },
        { name: 'Red', hex: '#EF4444' },
    ],
    availability: 'In Stock',
  },
  {
    id: 'elegant-watch',
    title: 'Elegant Watch',
    price: '$199.99',
    oldPrice: '$249.99',
    tag: 'LUXURY',
    tagColor: 'bg-yellow-500 text-black',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'A timeless piece to complement your style for any occasion. This elegant watch features a stainless steel case, sapphire crystal glass, and a genuine leather strap. Water-resistant up to 50 meters. Perfect for both formal and casual wear.',
    rating: 4.8,
    reviews: 85,
    sizes: ['One Size'],
    colors: [{ name: 'Silver', hex: '#C0C0C0' }],
    availability: 'In Stock',
  },
  {
    id: 'wireless-headphones',
    tag: 'SALE',
    tagColor: 'bg-green-500 text-white',
    title: 'Wireless Headphones',
    price: '$79.99',
    oldPrice: '$99.99',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a83c247090ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Immersive sound quality with long-lasting battery life. These wireless headphones offer active noise cancellation, comfortable earcups, and intuitive controls. Enjoy your music, podcasts, and calls क्रिस्टल-clear.',
    rating: 4.2,
    reviews: 210,
    sizes: ['Adjustable'],
    colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF', ringColor: 'ring-gray-300' },
    ],
    availability: 'Limited Stock',
  },
  {
    id: 'leather-backpack',
    title: 'Leather Backpack',
    price: '$120.00',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description: 'Durable and spacious, this genuine leather backpack is perfect for daily commutes or weekend adventures. Features multiple compartments and padded laptop sleeve.',
    rating: 4.6,
    reviews: 95,
    sizes: ['One Size'],
    colors: [{ name: 'Brown', hex: '#A0522D' }],
    availability: 'In Stock',
  },
];


const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');


  useEffect(() => {
    const foundProduct = sampleProducts.find(p => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedImageIndex(0);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0].name);
      }
    }
  }, [productId]);

  if (!product) {
    return <div className="text-center py-20">Loading product details or product not found...</div>;
  }

  const currentImages = product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/800x800.png?text=No+Image'];

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };


  return (
    <div className="flex flex-col">
      <nav className="text-sm mb-6 text-gray-500">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-blue-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md mb-4">
            <img
              src={currentImages[selectedImageIndex]}
              alt={`${product.title} - Image ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          {currentImages.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {currentImages.map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all
                              ${index === selectedImageIndex ? 'border-blue-500 ring-2 ring-blue-500' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={imgSrc} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {product.tag && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded self-start mb-2 ${product.tagColor || 'bg-blue-500 text-white'}`}>
              {product.tag}
            </span>
          )}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-3xl font-bold text-gray-900">{product.price}</p>
            {product.oldPrice && <p className="text-lg text-red-500 line-through">{product.oldPrice}</p>}
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-6">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size: <span className="font-semibold">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                                ${selectedSize === size ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color: <span className="font-semibold">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={color.name}
                    style={{ backgroundColor: color.hex }}
                    className={`w-8 h-8 rounded-full border border-gray-300 focus:outline-none transition-all
                                ${selectedColor === color.name ? `ring-2 ring-offset-1 ${color.ringColor || 'ring-blue-500'}` : ''}`}
                  />
                ))}
              </div>
            </div>
          )}


          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => handleQuantityChange(-1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"><Minus size={16} /></button>
              <span className="px-4 py-2 text-center w-12 font-medium">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"><Plus size={16} /></button>
            </div>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Availability: <span className={product.availability === 'In Stock' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>{product.availability}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
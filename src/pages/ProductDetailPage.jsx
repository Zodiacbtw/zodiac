import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import { Loader2, ChevronLeft, Star, ShoppingCart } from 'lucide-react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { activeProduct, loading, error } = useSelector(state => state.product);
  const cartItems = useSelector(state => state.shoppingCart.cart);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  const handleAddToCart = () => {
    if (activeProduct) {
      const itemInCart = cartItems.find(item => item.product.id === activeProduct.id);
      const currentQuantityInCart = itemInCart ? itemInCart.count : 0;

      if (currentQuantityInCart >= activeProduct.stock) {
        alert("Üzgünüz, bu ürün için maksimum stok adedine ulaştınız!");
        return;
      }
      
      dispatch(addToCart(activeProduct));
      alert(`"${activeProduct.name}" sepete eklendi!`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 min-h-screen">
        <Loader2 className="animate-spin h-16 w-16 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-20">Error fetching product: {error}</div>;
  }

  if (!activeProduct) {
    return <div className="text-center text-gray-500 py-20">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => history.goBack()}
        className="flex items-center gap-2 mb-8 text-gray-600 hover:text-blue-600 font-medium transition-colors"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <img
            src={activeProduct.images?.[0]?.url || 'https://via.placeholder.com/800'}
            alt={activeProduct.name}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{activeProduct.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < Math.round(activeProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
              ))}
            </div>
            <span className="ml-3 text-sm text-gray-600">({activeProduct.rating.toFixed(2)} rating)</span>
          </div>
          
          <p className="text-3xl font-bold text-blue-600 mb-6">{activeProduct.price.toFixed(2)} ₺</p>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed mb-6">{activeProduct.description}</p>
          
          <div className="text-sm text-gray-600 mb-6">
            Stock: <span className="font-semibold text-green-700">{activeProduct.stock} available</span>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
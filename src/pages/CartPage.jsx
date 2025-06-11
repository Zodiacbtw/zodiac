import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCartItemCount, removeFromCart, toggleCartItemChecked } from '../store/actions/shoppingCartActions';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.shoppingCart.cart);

    const handleQuantityChange = (productId, newCount) => {
        dispatch(updateCartItemCount(productId, newCount));
    };

    const handleRemoveItem = (productId) => {
        if (window.confirm("Bu ürünü sepetten kaldırmak istediğinizden emin misiniz?")) {
            dispatch(removeFromCart(productId));
        }
    };

    const handleToggleChecked = (productId) => {
        dispatch(toggleCartItemChecked(productId));
    };

    const totalAmount = useMemo(() => {
        return cartItems
            .filter(item => item.checked)
            .reduce((total, item) => total + (item.product.price * item.count), 0);
    }, [cartItems]);

    const totalItemCount = cartItems.reduce((total, item) => total + item.count, 0);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Sepetim ({totalItemCount} Ürün)</h1>

            {cartItems.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-grow">
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.product.id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => handleToggleChecked(item.product.id)}
                                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <img src={item.product.images[0].url} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">Satıcı: {item.product.store_name || "Zodiac Store"}</p>
                                    </div>
                                    <div className="flex items-center border rounded-md">
                                        <button onClick={() => handleQuantityChange(item.product.id, item.count - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"><Minus size={16} /></button>
                                        <span className="px-4 py-1 text-center font-medium">{item.count}</span>
                                        <button onClick={() => handleQuantityChange(item.product.id, item.count + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"><Plus size={16} /></button>
                                    </div>
                                    <div className="flex flex-col items-end w-40">
                                        <p className="text-lg font-bold text-orange-600">{(item.product.price * item.count).toFixed(2)} TL</p>
                                        <button onClick={() => handleRemoveItem(item.product.id)} className="text-gray-400 hover:text-red-500 mt-2">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Toplam Tutar</span>
                                <span>{totalAmount.toFixed(2)} TL</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Sadece seçili ürünlerin toplamıdır.</p>
                            <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Siparişi Oluştur
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border">
                    <h2 className="text-2xl font-semibold text-gray-700">Sepetinizde ürün bulunmuyor.</h2>
                    <p className="text-gray-500 mt-2">Hemen alışverişe başlayarak sepetinizi doldurun!</p>
                    <Link to="/shop" className="inline-block mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                        Alışverişe Başla
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
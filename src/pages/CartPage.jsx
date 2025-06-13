import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    updateCartItemCount, removeFromCart, toggleCartItemChecked,
    applyDiscount, removeDiscount
} from '../store/actions/shoppingCartActions';
import { Plus, Minus, Trash2, XCircle } from 'lucide-react';

const validCoupons = {
    "ZODIAC10": { code: "ZODIAC10", type: "percentage", value: 10 },
    "ZODIAC50": { code: "ZODIAC50", type: "fixed", value: 50 },
};

const CartPage = () => {
    const dispatch = useDispatch();
    const { cart: cartItems, discount: appliedDiscount } = useSelector(state => state.shoppingCart);
    const { categories } = useSelector(state => state.category);

    const [isCouponFormVisible, setIsCouponFormVisible] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });

    const handleQuantityChange = (productId, currentCount, change) => {
        const item = cartItems.find(item => item.product.id === productId);
        if (!item) return;
        if (change > 0 && (currentCount + change) > item.product.stock) {
            alert(`Only ${item.product.stock} items left in stock.`);
            return;
        }
        const newCount = currentCount + change;
        if (newCount <= 0) {
            handleRemoveItem(productId);
        } else {
            dispatch(updateCartItemCount(productId, newCount));
        }
    };

    const handleRemoveItem = (productId) => {
        if (window.confirm("Are you sure you want to remove this item from your cart?")) {
            dispatch(removeFromCart(productId));
        }
    };

    const handleToggleChecked = (productId) => {
        dispatch(toggleCartItemChecked(productId));
    };

    const handleApplyCoupon = () => {
        const code = couponInput.trim().toUpperCase();
        const coupon = validCoupons[code];
        if (coupon) {
            dispatch(applyDiscount(coupon));
            setCouponMessage({ text: `Coupon "${code}" has been applied successfully!`, type: "success" });
            setIsCouponFormVisible(false);
            setCouponInput("");
        } else {
            dispatch(removeDiscount());
            setCouponMessage({ text: "Invalid or expired coupon code.", type: "error" });
        }
    };
    
    const handleRemoveCoupon = () => {
        dispatch(removeDiscount());
        setCouponMessage({ text: "", type: "" });
    };

    const orderSummary = useMemo(() => {
        const checkedItems = cartItems.filter(item => item.checked);
        const productsTotal = checkedItems.reduce((total, item) => total + (item.product.price * item.count), 0);
        let couponDiscountValue = 0;
        if (appliedDiscount && productsTotal > 0) {
            if (appliedDiscount.type === 'percentage') {
                couponDiscountValue = (productsTotal * appliedDiscount.value) / 100;
            } else if (appliedDiscount.type === 'fixed') {
                couponDiscountValue = appliedDiscount.value;
            }
        }
        const couponDiscount = Math.min(productsTotal, couponDiscountValue);
        const subtotal = productsTotal - couponDiscount;
        const shippingRate = 29.99;
        const freeShippingThreshold = 300.00;
        let finalShippingCost = 0;
        if (productsTotal > 0 && subtotal < freeShippingThreshold) {
            finalShippingCost = shippingRate;
        }
        const grandTotal = subtotal + finalShippingCost;
        return { productsTotal, couponDiscount, subtotal, finalShippingCost, grandTotal };
    }, [cartItems, appliedDiscount]);

    const totalItemCount = cartItems.reduce((total, item) => total + item.count, 0);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">My Cart ({totalItemCount} Items)</h1>

            {cartItems.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-grow">
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.product.id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => handleToggleChecked(item.product.id)}
                                        className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                    />
                                    <img src={item.product.images[0]?.url || 'https://via.placeholder.com/150'} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">Seller: {item.product.store_name || "Zodiac Store"}</p>
                                    </div>
                                    <div className="flex items-center border rounded-md">
                                        <button onClick={() => handleQuantityChange(item.product.id, item.count, -1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"><Minus size={16} /></button>
                                        <span className="px-4 py-1 text-center font-medium">{item.count}</span>
                                        <button onClick={() => handleQuantityChange(item.product.id, item.count, 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"><Plus size={16} /></button>
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

                    <div className="lg:w-96 w-full lg:flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24 space-y-4">
                            <h2 className="text-xl font-bold">Order Summary</h2>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{orderSummary.productsTotal.toFixed(2)} TL</span>
                                </div>
                                {orderSummary.couponDiscount > 0 && (
                                     <div className="flex justify-between items-center">
                                        <span>Discount Coupon ({appliedDiscount.code})</span>
                                        <span className="text-green-600 font-semibold">-{orderSummary.couponDiscount.toFixed(2)} TL</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center font-semibold border-t pt-2 mt-2">
                                    <span>Subtotal (after discount)</span>
                                    <span className="font-semibold">{orderSummary.subtotal.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping</span>
                                    <span className={orderSummary.finalShippingCost === 0 ? "text-green-600 font-semibold" : "font-semibold"}>
                                        {orderSummary.finalShippingCost > 0 ? `${orderSummary.finalShippingCost.toFixed(2)} TL` : "Free"}
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>{orderSummary.grandTotal.toFixed(2)} TL</span>
                            </div>

                            <div className="pt-2">
                                {appliedDiscount ? (
                                    <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-3 rounded-md flex justify-between items-center text-sm">
                                        <p>"{appliedDiscount.code}" coupon applied.</p>
                                        <button onClick={handleRemoveCoupon} className="text-green-800 hover:text-red-600" title="Remove Coupon"><XCircle size={18} /></button>
                                    </div>
                                ) : isCouponFormVisible ? (
                                    <div>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text"
                                                value={couponInput}
                                                onChange={(e) => setCouponInput(e.target.value)}
                                                placeholder="Enter discount code"
                                                className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm p-2"
                                            />
                                            <button onClick={handleApplyCoupon} className="bg-gray-700 text-white px-4 rounded-md hover:bg-black text-sm font-semibold">Apply</button>
                                        </div>
                                        <button onClick={() => setIsCouponFormVisible(false)} className="text-xs text-gray-500 mt-1 hover:underline">Cancel</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsCouponFormVisible(true)} className="w-full mt-4 border-dashed border-2 border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        + ENTER DISCOUNT CODE
                                    </button>
                                )}
                                {couponMessage.text && (
                                    <p className={`text-xs mt-2 ${couponMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                                        {couponMessage.text}
                                    </p>
                                )}
                            </div>

                            <Link 
                                to="/order"
                                className="block text-center w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Confirm Cart
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border">
                    <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
                    <p className="text-gray-500 mt-2">Start shopping now to fill your cart!</p>
                    <Link to="/shop" className="inline-block mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
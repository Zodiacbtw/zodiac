import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddresses, deleteAddress } from '../store/actions/addressActions';
import AddressForm from '../components/AddressForm';
import { Home, Briefcase, PlusCircle, Edit, Trash2 } from 'lucide-react';

const OrderPage = () => {
    const dispatch = useDispatch();
    
    const { addressList } = useSelector(state => state.address);
    const cartItems = useSelector(state => state.shoppingCart.cart);
    
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);
    
    useEffect(() => {
        if (addressList && addressList.length > 0 && !selectedShippingAddress) {
            const selectedExists = addressList.some(addr => addr.id === selectedShippingAddress);
            if (!selectedExists) {
                setSelectedShippingAddress(addressList[0].id);
            }
        } else if (addressList && addressList.length === 0) {
            setSelectedShippingAddress(null);
        }
    }, [addressList, selectedShippingAddress]);

    useEffect(() => {
        if (editingAddress) {
            const stillExists = addressList.some(addr => addr.id === editingAddress.id);
            if (!stillExists) {
                setEditingAddress(null);
                setShowForm(false);
            }
        }
    }, [addressList, editingAddress]);


    const handleAddNewAddress = () => {
        setEditingAddress(null);
        setShowForm(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleDeleteAddress = (addressId) => {
        if (window.confirm("Bu adresi silmek istediğinizden emin misiniz?")) {
            dispatch(deleteAddress(addressId));
        }
    };
    
    const orderSummary = useMemo(() => {
        const checkedItems = cartItems.filter(item => item.checked);
        const subtotal = checkedItems.reduce((total, item) => total + (item.product.price * item.count), 0);
        const shippingCost = subtotal > 0 ? 29.99 : 0;
        const freeShippingThreshold = 300.00;
        const shippingDiscount = subtotal >= freeShippingThreshold ? shippingCost : 0;
        const grandTotal = subtotal + shippingCost - shippingDiscount;
        return { subtotal, shippingCost, shippingDiscount, grandTotal };
    }, [cartItems]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Sipariş Bilgileri</h1>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-4">Teslimat Adresi</h2>
                    <div className="space-y-4">
                        {addressList.length > 0 && addressList.map(address => (
                            <div 
                                key={address.id} 
                                onClick={() => setSelectedShippingAddress(address.id)} 
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedShippingAddress === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <input 
                                            type="radio" 
                                            name="shippingAddress" 
                                            checked={selectedShippingAddress === address.id} 
                                            readOnly 
                                            className="h-5 w-5 text-orange-600 focus:ring-orange-500" 
                                        />
                                        <Home size={24} className="text-gray-600" />
                                        <div>
                                            <p className="font-bold text-gray-800">{address.title}</p>
                                            <p className="text-sm text-gray-600">{address.name} {address.surname}</p>
                                            <p className="text-sm text-gray-500">{address.neighborhood}, {address.district}/{address.city}</p>
                                            <p className="text-sm text-gray-500">{address.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-gray-500">
                                        <button onClick={(e) => { e.stopPropagation(); handleEditAddress(address); }} className="hover:text-blue-600"><Edit size={18} /></button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address.id); }} className="hover:text-red-600"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleAddNewAddress} className="w-full flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-all">
                            <PlusCircle /> Yeni Adres Ekle
                        </button>
                        {showForm && <AddressForm existingAddress={editingAddress} onFormClose={() => setShowForm(false)} />}
                    </div>
                </div>

                <div className="lg:w-96 w-full lg:flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24 space-y-4">
                        <h2 className="text-xl font-bold">Sipariş Özeti</h2>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between"><span>Ürünlerin Toplamı</span><span className="font-semibold">{orderSummary.subtotal.toFixed(2)} TL</span></div>
                            <div className="flex justify-between"><span>Kargo Toplamı</span><span className="font-semibold">{orderSummary.shippingCost.toFixed(2)} TL</span></div>
                            {orderSummary.shippingDiscount > 0 && (<div className="flex justify-between"><span>Kargo İndirimi</span><span className="text-green-600 font-semibold">-{orderSummary.shippingDiscount.toFixed(2)} TL</span></div>)}
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg font-bold"><span>Toplam</span><span>{orderSummary.grandTotal.toFixed(2)} TL</span></div>
                        <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">Kaydet ve Devam Et</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
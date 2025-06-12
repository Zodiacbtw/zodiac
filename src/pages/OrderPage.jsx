import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddresses, deleteAddress } from '../store/actions/addressActions';
import AddressForm from '../components/AddressForm';
import { Home, Briefcase, PlusCircle, Edit, Trash2 } from 'lucide-react';

const OrderPage = () => {
    const dispatch = useDispatch();
    const { addressList } = useSelector(state => state.address);
    const cartItems = useSelector(state => state.shoppingCart.cart);
    
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

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
    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Sipariş Bilgileri</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-4">Teslimat Adresi</h2>
                    <div className="space-y-4">
                        {addressList.map(address => (
                            <div key={address.id} onClick={() => setSelectedAddress(address.id)} 
                                 className={`p-4 border rounded-lg cursor-pointer ${selectedAddress === address.id ? 'border-orange-500 ring-2 ring-orange-200' : ''}`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="address" checked={selectedAddress === address.id} readOnly className="h-5 w-5" />
                                        <Home size={24} />
                                        <div>
                                            <p className="font-bold">{address.title}</p>
                                            <p className="text-sm text-gray-600">{address.name} {address.surname} - {address.phone}</p>
                                            <p className="text-sm text-gray-500">{address.neighborhood}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleEditAddress(address)}><Edit size={18} /></button>
                                        <button onClick={() => handleDeleteAddress(address.id)}><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleAddNewAddress} className="w-full flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-100">
                            <PlusCircle /> Yeni Adres Ekle
                        </button>
                        {showForm && <AddressForm existingAddress={editingAddress} onFormClose={() => setShowForm(false)} />}
                    </div>
                </div>

                <div className="lg:w-96">
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
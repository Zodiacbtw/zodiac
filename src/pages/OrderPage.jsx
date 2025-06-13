import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAddresses, deleteAddress } from '../store/actions/addressActions';
import { fetchCards, deleteCard } from '../store/actions/paymentActions';
import { createOrder } from '../store/actions/orderActions';
import AddressForm from '../components/AddressForm';
import CardForm from '../components/CardForm';
import { Home, Edit, Trash2, PlusCircle, CreditCard } from 'lucide-react';

const OrderPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const { addressList } = useSelector(state => state.address);
    const { cardList } = useSelector(state => state.payment);
    const { cart: cartItems, discount: appliedDiscount } = useSelector(state => state.shoppingCart);
    const { loading: orderLoading } = useSelector(state => state.order);
    
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showCardForm, setShowCardForm] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [cvv, setCvv] = useState('');

    useEffect(() => {
        dispatch(fetchAddresses());
        dispatch(fetchCards());
    }, [dispatch]);
    
    useEffect(() => {
        if (addressList.length > 0 && !addressList.some(addr => addr.id === selectedAddress)) {
            setSelectedAddress(addressList[0].id);
        }
        if (cardList.length > 0 && !cardList.some(card => card.id === selectedCard)) {
            setSelectedCard(cardList[0].id);
        }
    }, [addressList, cardList, selectedAddress, selectedCard]);

    useEffect(() => {
        if (editingAddress && !addressList.some(addr => addr.id === editingAddress.id)) {
            setEditingAddress(null);
            setShowAddressForm(false);
        }
    }, [addressList, editingAddress]);

    useEffect(() => {
        if (editingCard && !cardList.some(card => card.id === editingCard.id)) {
            setEditingCard(null);
            setShowCardForm(false);
        }
    }, [cardList, editingCard]);

    const handleGoToPayment = () => {
        if (selectedAddress) {
            setCurrentStep(2);
        } else {
            alert("Please select a delivery address.");
        }
    };

    const handleCreateOrder = () => {
        if (!selectedAddress) return alert("Please select a delivery address.");
        if (!selectedCard) return alert("Please select a payment card.");
        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            alert("Please enter a valid CVV (3 digit number).");
            if (!showCardForm) {
                const cardToEdit = cardList.find(c => c.id === selectedCard);
                if (cardToEdit) handleEditCard(cardToEdit);
            }
            return;
        }

        const card = cardList.find(c => c.id === selectedCard);
        const checkedItems = cartItems.filter(item => item.checked);
        if (!card || checkedItems.length === 0) {
            alert("Required information for the order is missing.");
            return;
        }

        const orderData = {
            address_id: selectedAddress,
            order_date: new Date().toISOString(),
            card_no: card.card_no,
            card_name: card.name_on_card,
            card_expire_month: card.expire_month,
            card_expire_year: card.expire_year,
            card_ccv: parseInt(cvv, 10),
            price: orderSummary.grandTotal,
            products: checkedItems.map(item => item.product.id),
        };
        
        dispatch(createOrder(orderData, history));
    };

    const handleAddNewAddress = () => { setEditingAddress(null); setShowAddressForm(true); };
    const handleEditAddress = (address) => { setEditingAddress(address); setShowAddressForm(true); };
    const handleDeleteAddress = (addressId) => { if (window.confirm("Are you sure you want to delete this address?")) dispatch(deleteAddress(addressId)); };
    
    const handleAddNewCard = () => { setEditingCard(null); setShowCardForm(true); };
    const handleEditCard = (card) => { setEditingCard(card); setShowCardForm(true); };
    const handleDeleteCard = (cardId) => { if (window.confirm("Are you sure you want to delete this card?")) dispatch(deleteCard(cardId)); };

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
            <div className="flex mb-8 border-b">
                <div className={`flex-1 p-4 text-center border-b-4 ${currentStep === 1 ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'}`}>
                    <h2 className="text-xl font-bold">1. Address Information</h2>
                </div>
                <div className={`flex-1 p-4 text-center border-b-4 ${currentStep === 2 ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500'}`}>
                    <h2 className="text-xl font-bold">2. Payment Options</h2>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-grow">
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
                            <div className="space-y-4">
                                {addressList.map(address => (
                                    <div key={address.id} onClick={() => setSelectedAddress(address.id)} className={`p-4 border-2 rounded-lg cursor-pointer ${selectedAddress === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-start gap-4">
                                                <input type="radio" name="address" checked={selectedAddress === address.id} readOnly className="h-5 w-5 mt-1" />
                                                <Home size={24} className="mt-1" />
                                                <div>
                                                    <p className="font-bold">{address.title}</p>
                                                    <p className="text-sm font-semibold">{address.name} {address.surname}</p>
                                                    <p className="text-sm">{address.neighborhood}, {address.district}/{address.city}</p>
                                                    <p className="text-sm">{address.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={(e) => { e.stopPropagation(); handleEditAddress(address); }}><Edit size={18} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address.id); }}><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={handleAddNewAddress} className="w-full flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg">
                                    <PlusCircle /> Add New Address
                                </button>
                                {showAddressForm && <AddressForm existingAddress={editingAddress} onFormClose={() => setShowAddressForm(false)} />}
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Pay with Card</h2>
                            <div className="space-y-4">
                                {cardList.map(card => (
                                    <div key={card.id} onClick={() => setSelectedCard(card.id)} className={`p-4 border-2 rounded-lg cursor-pointer ${selectedCard === card.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <input type="radio" name="card" checked={selectedCard === card.id} readOnly className="h-5 w-5" />
                                                <CreditCard size={24} />
                                                <div>
                                                    <p className="font-bold">{card.name_on_card}</p>
                                                    <p>**** **** **** {card.card_no.slice(-4)}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={(e) => { e.stopPropagation(); handleEditCard(card); }}><Edit size={18} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={handleAddNewCard} className="w-full flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg">
                                    <PlusCircle /> Add New Card
                                </button>
                                {showCardForm && <CardForm existingCard={editingCard} onFormClose={() => setShowCardForm(false)} cvv={cvv} onCvvChange={setCvv} />}
                            </div>
                        </div>
                    )}
                </div>
                <div className="lg:w-96 w-full lg:flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24 space-y-4">
                        <h2 className="text-xl font-bold">Order Summary</h2>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{orderSummary.subtotal.toFixed(2)} TL</span></div>
                            <div className="flex justify-between"><span>Shipping</span><span className="font-semibold">{orderSummary.shippingCost.toFixed(2)} TL</span></div>
                            {orderSummary.shippingDiscount > 0 && (<div className="flex justify-between"><span>Shipping Discount</span><span className="text-green-600 font-semibold">-{orderSummary.shippingDiscount.toFixed(2)} TL</span></div>)}
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{orderSummary.grandTotal.toFixed(2)} TL</span></div>
                        {currentStep === 1 && <button onClick={handleGoToPayment} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">Save and Continue</button>}
                        {currentStep === 2 && <button onClick={handleCreateOrder} disabled={orderLoading} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50">{orderLoading ? 'İşleniyor...' : 'Ödeme Yap'}</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
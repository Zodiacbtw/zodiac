import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center text-center py-20">
            <CheckCircle className="text-green-500 w-24 h-24 mb-6" />
            <h1 className="text-4xl font-bold text-gray-800">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600 mt-4">
                Thank you for creating your order.
            </p>
            <p className="text-gray-500 mt-2">
                We have sent the order details to your e-mail address.
            </p>
            <Link 
                to="/" 
                className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderSuccessPage;
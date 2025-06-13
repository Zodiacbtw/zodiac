import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store/actions/orderActions';
import OrderRow from '../components/OrderRow';
import { Loader2 } from 'lucide-react';

const PreviousOrdersPage = () => {
    const dispatch = useDispatch();
    const { orderList, previousOrderLoading, error } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">My Orders</h1>

            {previousOrderLoading && (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
                </div>
            )}

            {!previousOrderLoading && error && (
                <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">
                    <p>An error occurred while loading orders: {error}</p>
                </div>
            )}

            {!previousOrderLoading && !error && (
                orderList.length > 0 ? (
                    <div className="space-y-4">
                        {orderList.map(order => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm border">
                        <h2 className="text-2xl font-semibold text-gray-700">You have no orders yet.</h2>
                        <p className="text-gray-500 mt-2">Start shopping now to place your first order!</p>
                        <Link to="/shop" className="inline-block mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
                            Start Shopping
                        </Link>
                    </div>
                )
            )}
        </div>
    );
};

export default PreviousOrdersPage;
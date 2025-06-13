import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const slugify = (text) => {
    if (!text) return '';
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return text.toString().toLowerCase().replace(/ı/g, 'i').replace(/\s+/g, '-').replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

const genderToUrlKey = (genderApiValue) => (genderApiValue === 'k' ? 'women' : 'men');

const OrderRow = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <div 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex-grow">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold">{formatDate(order.order_date)}</p>
                </div>
                
                <div className="flex items-center gap-4 text-right">
                    <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-lg font-bold text-orange-600">{order.price.toFixed(2)} TL</p>
                    </div>
                    {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>
            </div>

            {isOpen && (
                <div className="border-t p-4 bg-gray-50">
                    <h4 className="font-bold mb-3 text-gray-700">Order Details</h4>
                    <div className="space-y-3">
                        {order.products && order.products.length > 0 ? (
                            order.products.map(product => {
                                const productDetailUrl = `/shop/${genderToUrlKey(product.gender || 'u')}/${slugify(product.category?.title || 'category')}/${product.id}/${slugify(product.name)}`;

                                return (
                                <div key={product.id} className="flex items-center gap-4 p-2 rounded-md">
                                    <Link to={productDetailUrl}>
                                        <img 
                                            src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/150'} 
                                            alt={product.name} 
                                            className="w-16 h-16 object-cover rounded-md hover:opacity-80 transition-opacity" 
                                        />
                                    </Link>
                                    <div className="flex-grow">
                                        <Link to={productDetailUrl} className="font-semibold text-sm hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </Link>
                                        <p className="text-xs text-gray-500">
                                            {product.count || 1} x {product.price.toFixed(2)} TL
                                        </p>
                                    </div>
                                    <p className="font-semibold text-sm text-gray-800">
                                        {(product.price * (product.count || 1)).toFixed(2)} TL
                                    </p>
                                </div>
                                )
                            })
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">No product details available for this order.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderRow;
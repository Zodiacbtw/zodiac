import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from '../store/actions/paymentActions';

const CardForm = ({ existingCard, onFormClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name_on_card: '', card_no: '', expire_month: '', expire_year: '', cvv: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (existingCard) {
            setFormData({
                id: existingCard.id,
                name_on_card: existingCard.name_on_card || '',
                card_no: existingCard.card_no || '',
                expire_month: String(existingCard.expire_month).padStart(2, '0') || '',
                expire_year: String(existingCard.expire_year) || '',
                cvv: '',
            });
        } else {
             setFormData({
                name_on_card: '', card_no: '', expire_month: '', expire_year: '', cvv: ''
            });
        }
        setFormErrors({});
    }, [existingCard]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'card_no' && value.length > 16) || (name === 'cvv' && value.length > 3)) {
            return;
        }
        if ((name === 'card_no' || name === 'cvv') && value !== '' && !/^\d+$/.test(value)) {
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const selectedYear = parseInt(formData.expire_year, 10);
        const selectedMonth = parseInt(formData.expire_month, 10);

        if (formData.card_no.length !== 16) {
            errors.card_no = "Kart numarası 16 haneli olmalıdır.";
        }
        if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
            errors.date = "Geçerli bir son kullanma tarihi giriniz.";
        }
        if (formData.cvv.length !== 3) {
            errors.cvv = "CVV 3 haneli olmalıdır.";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const { cvv, ...cardDataForApi } = {
            ...formData,
            expire_month: parseInt(formData.expire_month, 10),
            expire_year: parseInt(formData.expire_year, 10),
        };

        if (cardDataForApi.id) {
            dispatch(updateCard(cardDataForApi));
        } else {
            dispatch(addCard(cardDataForApi));
        }
        onFormClose();
    };

    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, i) => currentYear + i);

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 border mt-4">
            <h3 className="text-xl font-bold mb-4">{formData.id ? 'Kart Bilgilerini Düzenle' : 'Yeni Kart Ekle'}</h3>
            
            <div>
                <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700 mb-1">
                    Kart Üzerindeki İsim
                </label>
                <input 
                    type="text" 
                    id="name_on_card" 
                    name="name_on_card" 
                    value={formData.name_on_card} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
            </div>

            <div>
                <label htmlFor="card_no" className="block text-sm font-medium text-gray-700 mb-1">
                    Kart Numarası
                </label>
                <input 
                    type="text" 
                    id="card_no" 
                    name="card_no" 
                    value={formData.card_no} 
                    onChange={handleChange} 
                    placeholder="---- ---- ---- ----" 
                    required 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" 
                />
                {formErrors.card_no && <p className="text-xs text-red-500 mt-1">{formErrors.card_no}</p>}
            </div>
            
            <div className="flex gap-4 items-start">
                <div className="w-1/2">
                    <label htmlFor="expire_month" className="block text-sm font-medium text-gray-700 mb-1">
                        Son Kullanma Tarihi
                    </label>
                    <div className="flex gap-2">
                        <select 
                            id="expire_month" 
                            name="expire_month" 
                            value={formData.expire_month} 
                            onChange={handleChange} 
                            required 
                            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${!formData.expire_month ? 'text-gray-500' : ''}`}
                        >
                            <option value="" disabled>Ay</option>
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select 
                            id="expire_year" 
                            name="expire_year" 
                            value={formData.expire_year} 
                            onChange={handleChange} 
                            required 
                            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${!formData.expire_year ? 'text-gray-500' : ''}`}
                        >
                            <option value="" disabled>Yıl</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    {formErrors.date && <p className="text-xs text-red-500 mt-1">{formErrors.date}</p>}
                </div>
                <div className="w-1/2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                    </label>
                    <input 
                        type="text" 
                        id="cvv" 
                        name="cvv" 
                        value={formData.cvv}
                        onChange={handleChange} 
                        maxLength="3"
                        placeholder="123" 
                        required 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {formErrors.cvv && <p className="text-xs text-red-500 mt-1">{formErrors.cvv}</p>}
                </div>
            </div>
            
            <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">Kaydet</button>
                <button type="button" onClick={onFormClose} className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">İptal</button>
            </div>
        </form>
    );
};

export default CardForm;
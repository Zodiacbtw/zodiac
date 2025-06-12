import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../store/actions/addressActions';
import { sehirler } from '../data/iller'; 

const AddressForm = ({ existingAddress, onFormClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '', name: '', surname: '', phone: '', city: '', district: '', neighborhood: '', address: ''
    });

    useEffect(() => {
        if (existingAddress) {
        }
    }, [existingAddress]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalAddressData = {
            title: formData.title,
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            city: formData.city,
            district: formData.district,
            neighborhood: `${formData.neighborhood}, ${formData.address}`,
        };
        
        if (formData.id) {
            finalAddressData.id = formData.id;
            dispatch(updateAddress(finalAddressData));
        } else {
            dispatch(addAddress(finalAddressData));
        }
        onFormClose();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 border mt-4">
            <h3 className="text-xl font-bold">{formData.id ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}</h3>
            
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Adres Başlığı (Örn: Ev, İş)" required className="w-full border-gray-300 rounded-md shadow-sm" />
            
            <div className="flex gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="İsim" required className="w-1/2 border-gray-300 rounded-md shadow-sm" />
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Soyisim" required className="w-1/2 border-gray-300 rounded-md shadow-sm" />
            </div>

            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon (örn: 5xxxxxxxxx)" required className="w-full border-gray-300 rounded-md shadow-sm" />

            <div className="flex gap-4">
                <select name="city" value={formData.city} onChange={handleChange} required className="w-1/2 border-gray-300 rounded-md shadow-sm">
                    <option value="">İl Seçiniz</option>
                    {sehirler.map((sehir, index) => (
                        <option key={index} value={sehir}>
                            {sehir}
                        </option>
                    ))}
                </select>
                <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="İlçe" required className="w-1/2 border-gray-300 rounded-md shadow-sm" />
            </div>

            <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Mahalle" required className="w-full border-gray-300 rounded-md shadow-sm" />
            
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Adres Detayı (Sokak, Bina, Daire No)" required rows="3" className="w-full border-gray-300 rounded-md shadow-sm" />

            <div className="flex gap-4 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Kaydet
                </button>
                <button type="button" onClick={onFormClose} className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    İptal
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
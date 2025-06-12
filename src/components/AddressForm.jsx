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
            setFormData({
                id: existingAddress.id,
                title: existingAddress.title || '',
                name: existingAddress.name || '',
                surname: existingAddress.surname || '',
                phone: existingAddress.phone || '',
                city: existingAddress.city || '',
                district: existingAddress.district || '',
                neighborhood: existingAddress.neighborhood.split(',')[0] || '',
                address: existingAddress.neighborhood.split(',').slice(1).join(',').trim() || '',
            });
        } else {
            setFormData({
                title: '', name: '', surname: '', phone: '', city: '', district: '', neighborhood: '', address: ''
            });
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
            <h3 className="text-xl font-bold mb-2">{formData.id ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}</h3>
            
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Adres Başlığı</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Ev, İş" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
            </div>

            <div className="flex gap-4">
                <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">İsim</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Adınız" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div className="w-1/2">
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Soyisim</label>
                    <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} placeholder="Soyadınız" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="5xxxxxxxxx" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
            </div>

            <div className="flex gap-4">
                <div className="w-1/2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">İl</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500">
                        <option value="">İl Seçiniz</option>
                        {sehirler.map((sehir, index) => (
                            <option key={index} value={sehir}>{sehir}</option>
                        ))}
                    </select>
                </div>
                <div className="w-1/2">
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">İlçe</label>
                    <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} placeholder="İlçe" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
                </div>
            </div>

            <div>
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Mahalle</label>
                <input type="text" id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Mahalle" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
            </div>
            
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres Detayı</label>
                <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Sokak, Bina Adı/No, Daire No" required rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
            </div>

            <div className="flex gap-4 pt-2">
                <button type="submit" className="flex-1 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
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
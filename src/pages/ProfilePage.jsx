import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { uploadProfilePhoto, removeUserPhoto } from '../store/actions/clientActions';
import { UserCircle, Edit, Trash2 } from 'lucide-react';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.client);

    const fileInputRef = useRef(null);

    if (!isAuthenticated || !user) {
        return <Redirect to="/" />;
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(uploadProfilePhoto(file));
        }
    };

    const handleRemoveClick = () => {
        if (window.confirm("Are you sure you want to remove your profile picture?")) {
            dispatch(removeUserPhoto());
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="text-4xl font-bold text-center mb-8">My Profile</h1>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <div className="relative mb-6">
                    {user.photo ? (
                        <img
                            src={user.photo}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                        />
                    ) : (
                        <UserCircle className="w-32 h-32 text-gray-300" />
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/jpeg, image/gif"
                    />
                    <div className="absolute -bottom-2 -right-2 flex gap-2">
                        <button onClick={handleEditClick} className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors" title="Change">
                            <Edit size={16} />
                        </button>
                        {user.photo && (
                            <button onClick={handleRemoveClick} className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors" title="Remove">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
                
                <h2 className="text-2xl font-semibold">{user.name} {user.surname || ''}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
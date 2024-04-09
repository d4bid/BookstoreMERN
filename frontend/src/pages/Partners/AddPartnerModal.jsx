import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddPartnerModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('company');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        previewImage(selectedImage);
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const previewImage = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
    };

    const handleSavePartner = async () => {
        try {
            setLoading(true);

            const base64Image = await convertImageToBase64(image);

            const formData = {
                name,
                type,
                image: base64Image,
            };

            await axios.post('http://localhost:5555/partners', formData);

            setLoading(false);
            enqueueSnackbar('Partner Added Successfully', { variant: 'success' });
            onClose();
            // Trigger a re-fetch of the partners list in the parent component (PartnerList)
            window.dispatchEvent(new Event('newPartnerAdded'));
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Error', { variant: 'error' });
            console.log(error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-full md:w-[600px]">
                <h1 className="text-3xl mb-4">Add Partner</h1>
                {loading ? <Spinner /> : ''}
                <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        <option value="company">Company</option>
                        <option value="academe">Academe</option>
                    </select>
                </div>
                <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Image</label>
                    <input
                        type='file'
                        onChange={handleImageChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Selected Partner"
                            className="mt-4 max-w-[300px] mx-auto"
                        />
                    )}
                </div>
                <div className="flex justify-end">
                    <button className='p-2 bg-sky-300 mr-4' onClick={onClose}>
                        Cancel
                    </button>
                    <button className='p-2 bg-sky-300' onClick={handleSavePartner}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPartnerModal;

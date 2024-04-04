import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddFrameModal = ({ onClose }) => {
    const [name, setName] = useState('');
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

    const handleSaveFrame = async () => {
        try {
            setLoading(true);

            const base64Image = await convertImageToBase64(image);

            const formData = {
                name,
                image: base64Image,
            };

            await axios.post('http://localhost:5555/frames', formData);

            setLoading(false);
            enqueueSnackbar('Frame Added Successfully', { variant: 'success' });
            onClose();
            // Trigger a re-fetch of the frames list in the parent component (FrameList)
            window.dispatchEvent(new Event('newFrameAdded'));
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Error', { variant: 'error' });
            console.log(error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-full md:w-[600px]">
                <h1 className="text-3xl mb-4">Add Frame</h1>
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
                    <label className='text-xl mr-4 text-gray-500'>Image</label>
                    <input
                        type='file'
                        onChange={handleImageChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Selected Frame"
                            className="mt-4 max-w-[300px] mx-auto"
                        />
                    )}
                </div>
                <div className="flex justify-end">
                    <button className='p-2 bg-sky-300 mr-4' onClick={onClose}>
                        Cancel
                    </button>
                    <button className='p-2 bg-sky-300' onClick={handleSaveFrame}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFrameModal;

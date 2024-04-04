import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Buffer } from 'buffer';

const EditFrameModal = ({ onClose, frameId }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newImage, setNewImage] = useState(null); // New state for the updated image
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchFrame = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:5555/frames/${frameId}`);
                const { name, image } = response.data;

                setName(name);

                // Convert Buffer to Base64
                const base64Image = `data:image/jpeg;base64,${Buffer.from(image).toString('base64')}`;
                setImage(base64Image);
                setImagePreview(base64Image);

                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchFrame();
    }, [frameId]);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewImage(selectedImage);
        previewImage(selectedImage);
    };

    const previewImage = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
    };

    const handleUpdateFrame = async () => {
        try {
            setLoading(true);

            let updatedImage = image.split(',')[1]; // Use the existing image as default

            if (newImage) {
                const base64NewImage = await convertImageToBase64(newImage);
                updatedImage = base64NewImage;
            }

            const formData = {
                name,
                image: updatedImage,
            };

            await axios.put(`http://localhost:5555/frames/${frameId}`, formData);

            setLoading(false);
            enqueueSnackbar('Frame Updated Successfully', { variant: 'success' });
            onClose();
            window.dispatchEvent(new Event('frameUpdated'));
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Error', { variant: 'error' });
            console.log(error);
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-full md:w-[600px]">
                <h1 className="text-3xl mb-4">Edit Frame</h1>
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
                    <button className='p-2 bg-sky-300' onClick={handleUpdateFrame}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditFrameModal;

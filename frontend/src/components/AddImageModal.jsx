import React, { useState } from 'react';
import Spinner from './Spinner';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddImageModal = ({ onClose }) => {
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
        previewImages(selectedImages);
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const previewImages = async (selectedImages) => {
        const previews = [];
        for (const image of selectedImages) {
            const base64Image = await convertImageToBase64(image);
            previews.push(base64Image);
        }
        setImagePreviews(previews);
    };

    const handleSaveImages = async () => {
        try {
            setLoading(true);

            const base64Images = await Promise.all(images.map((image) => convertImageToBase64(image)));

            const formData = {
                images: base64Images,
            };

            await axios.post('http://localhost:5555/slideshow', formData); // Updated API endpoint

            setLoading(false);
            enqueueSnackbar('Images Added Successfully', { variant: 'success' });
            onClose();
            // Trigger a re-fetch of the images list in the parent component (ImageList)
            window.dispatchEvent(new Event('newImagesAdded'));
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Error', { variant: 'error' });
            console.log(error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-full md:w-[600px]">
                <h1 className="text-3xl mb-4">Add Images</h1>
                {loading ? <Spinner /> : ''}
                <div className="my-4">
                    <label className='text-xl mr-4 text-gray-500'>Images</label>
                    <input
                        type='file'
                        onChange={handleImageChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        multiple
                    />
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {imagePreviews.map((preview, index) => (
                            <img
                                key={index}
                                src={`data:image/jpeg;base64,${preview}`}
                                alt="Selected Image"
                                className="max-w-[100px] mx-auto"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className='p-2 bg-sky-300 mr-4' onClick={onClose}>
                        Cancel
                    </button>
                    <button className='p-2 bg-sky-300' onClick={handleSaveImages}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddImageModal;

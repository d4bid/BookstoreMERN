import React, { useState } from 'react';
import BackButton from '../../components/BackButtonHome';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddFrames = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      navigate('/frames');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton destination="/frames" />
      <h1 className='text-3xl my-4'>Add Frame</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-4 mx-auto">
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveFrame}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddFrames;

import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddFrameModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/bmp', 'image/webp'];

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage && allowedImageTypes.includes(selectedImage.type)) {
            setImage(selectedImage);
            previewImage(selectedImage);
        } else {
            // Handle invalid file type
            enqueueSnackbar('Please select a valid image file (JPEG, PNG, BMP, WEBP)', { variant: 'warning' });
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
            if (!name) {
                setLoading(false);
                enqueueSnackbar('Frame name is required.', { variant: 'warning' });
                return;
            }

            if (!image) {
                setLoading(false);
                enqueueSnackbar('No image selected.', { variant: 'warning' });
                return;
            }

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
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Add Frame</DialogTitle>
            <DialogContent>
                {loading ? <CircularProgress /> : ''}
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <input
                    type='file'
                    accept="image/png, image/jpeg, image/bmp, image/webp"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                />
                <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                        Select File
                    </Button>
                </label>
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Selected Frame"
                        style={{ maxWidth: '300px', margin: '20px auto', display: 'block' }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveFrame} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddFrameModal;

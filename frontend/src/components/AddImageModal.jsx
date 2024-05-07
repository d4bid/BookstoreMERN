import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Grid, Card, CardMedia } from '@mui/material';
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

            await axios.post('http://localhost:5555/slideshow', formData);

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
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Add Images</DialogTitle>
            <DialogContent>
                {loading ? <CircularProgress /> : ''}
                <input
                    type='file'
                    accept="image/png, image/jpeg, image/gif, image/bmp, image/webp"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    multiple
                    id="image-upload"
                />
                <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                        Select File(s)
                    </Button>
                </label>
                <Grid container spacing={2} mt={4}>
                    {imagePreviews.map((preview, index) => (
                        <Grid item xs={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    src={`data:image/jpeg;base64,${preview}`}
                                    alt="Selected Image"
                                    style={{ maxWidth: '100px', margin: 'auto' }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveImages} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddImageModal;

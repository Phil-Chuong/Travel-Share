import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddNewPost.css';
import { Trash, Image, PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';


function AddNewPost({ onPostCreated }) {

    const userId = localStorage.getItem('userId');

    const [user, setUser] = useState(userId);///CHANGE WHEN USER LOGIN
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [countryId, setCountry] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/countries');
                setCountries(response.data);
            } catch (err) {
                console.error('Error fetching countries:', err);
                setError('Failed to load countries');
            }
        };

        fetchCountries();
    }, []);


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array

        // Generate preview URLs for new images
        const newImagePreviews = files.map((file) => URL.createObjectURL(file));

        // Append new files and previews to the existing ones
        setSelectedImages((prevImages) => [...prevImages, ...files]);
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
    };

    // Delete image preview and corresponding file
    const handleDeleteImage = (index) => {
        // Remove the image at the given index
        const newSelectedImages = selectedImages.filter((_, i) => i !== index);
        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);

        setSelectedImages(newSelectedImages);
        setImagePreviews(newImagePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('user_id', user);
        formData.append('title', title);
        formData.append('country_id', countryId);
        formData.append('content', content);

        // Append each image file to the formData
        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('images', selectedImages[i]);
        }
    
        // Log postData to confirm all fields are populated correctly
        console.log(formData);
    
        try {
            const response = await axios.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },  // Set multipart/form-data for file upload
            });
            console.log('New Post Response:', response.data);
            onPostCreated(response.data);
    
            // Reset form fields after submission
            setTitle('');
            setContent('');
            setCountry('');
            setSelectedImages([]);
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error creating post:', error.message);
            }
            setError('Failed to create post');
        }
    };
    

    return (
        <div className='upload-container'>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className='upload-top'>
                    <input 
                        className='title-text'
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                    <select 
                        className='country-select'
                        name="countryId" 
                        onChange={(e) => setCountry(e.target.value)}
                        value={countryId}
                        required
                    >
                        <option value="">Destination</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}>{country.country_name}</option>
                        ))}
                    </select>
                </div>
                
                {/* Image Previews */}
                <div className="image-previews">
                    {imagePreviews.map((image, index) => (
                        <div key={index} className="image-preview-container">
                        <img 
                            src={image} 
                            alt={`Preview ${index + 1}`} 
                            style={{ width: '200px', margin: '10px', borderRadius: '8px' }} 
                        />
                        {/* Delete button */}
                        <button 
                            type="button" 
                            onClick={() => handleDeleteImage(index)} 
                            className="delete-image-button"
                        >
                        <Trash size={32} />
                        </button>
                    </div>
                    ))}
                </div>

                <textarea 
                    className='content-text'
                    name="content"
                    placeholder="Write your post..." 
                    rows='5'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required 
                />
                <div className='upload-bottom'>
                    <label className='image-upload-label'>
                        <Image size={32} />
                        <input 
                            className='image-input'
                            type="file" 
                            multiple 
                            onChange={handleImageChange}
                            accept="image/*" // Accept only image files
                        />
                    </label>
                    <button 
                        className='confirm-post-button'
                        type="submit"><PaperPlaneTilt size={18} />
                    </button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
        
    );
}

export default AddNewPost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AddNewPost({ onPostCreated }) {
    const [user, setUser] = useState(4);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [countryId, setCountry] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    // Fetch countries from the backend
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/countries');
                setCountries(response.data); // Set the countries directly
            } catch (err) {
                console.error('Error fetching countries:', err);
                setError('Failed to load countries');
            }
        };

        fetchCountries();
    }, []);

    const handleImageChange = (e) => {
        setSelectedImages(e.target.files); // Allow multiple image selection
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
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                value={title} // Use individual state
                onChange={(e) => setTitle(e.target.value)} // Update state for title
                required 
            />
            <textarea 
                name="content"
                placeholder="Write your post..." 
                value={content} // Use individual state
                onChange={(e) => setContent(e.target.value)} // Update state for content
                required 
            />
            <select 
                name="countryId" 
                onChange={(e) => setCountry(e.target.value)} // Update state for countryId
                value={countryId} // Use individual state
                required
            >
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country.id} value={country.id}>{country.country_name}</option>
                ))}
            </select>
            <div>
                <label>Upload Images:</label>
                <input 
                    type="file" 
                    multiple 
                    onChange={handleImageChange}
                    accept="image/*" // Accept only image files
                />
            </div>
            <button type="submit">Create Post</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default AddNewPost;

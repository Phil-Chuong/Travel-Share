import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AddNewPost({ onPostCreated }) {
    const [user, setUser] = useState(4);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [countryId, setCountry] = useState('');
    const [imagePath, setImagePath] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const postData = {
            user_id: user,
            title: title,
            country_id: countryId,
            content: content,
            image_path: imagePath || null  // Send null if image_path is empty
        };
    
        // Log postData to confirm all fields are populated correctly
        console.log(postData);
    
        try {
            const response = await axios.post('/posts', postData, {
                headers: { 'Content-Type': 'application/json' }, // Use JSON format
            });
            console.log('New Post Response:', response.data);
            onPostCreated(response.data);
    
            // Reset form fields after submission
            setTitle('');
            setContent('');
            setCountry('');
            setImagePath('');
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
            <button type="submit">Create Post</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default AddNewPost;

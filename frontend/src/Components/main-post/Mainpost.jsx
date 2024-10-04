import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mainpost.css';


function Mainpost() {
    const [posts, setPosts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/posts'); // Adjust the URL if needed
                console.log('Response Data:', response.data);
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to fetch posts');
                setLoading(false);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:4000/countries'); // Adjust the URL for fetching countries
                setCountries(response.data);
            } catch (err) {
                console.error('Error fetching countries:', err);
                setError('Failed to fetch countries');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users'); // Adjust the URL for fetching countries
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users');
            }
        };
    
        fetchPosts();
        fetchCountries();
        fetchUsers();

        setLoading(false);
    }, []);

    // Function to get country name by country_id
    const getCountryName = (country_id) => {
        const country = countries.find(country => country.id === country_id);
        return country ? country.country_name : 'Unknown Country'; // Return the actual country name
    };

    // Function to get username by user_id
    const getUsername = (user_id) => {
        const user = users.find(user => user.id === user_id);
        return user ? user.username : 'Unknown User'; // Return the actual username
    };

    
    if (loading) {
        return <div>Loading posts...</div>;
    }
    
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='mainpost-container'>
            <h2>Main Posts</h2>
            <ul className="mainpost-list">
                {posts.map((post) => {
                console.log(post.image_path);
            
                return (
                    <li key={post.id} className="mainpost-item">
                        <div className='mainpost-info'>
                            <div className='mainpost-username'>
                                <h2>Traveller: {getUsername(post.user_id)}</h2>
                            </div>

                            <div className='mainpost-country'>
                                <h2>Location: {getCountryName(post.country_id)}</h2>
                            </div>
                        </div>

                        <div className="mainpost-title">
                            <h3>{post.title}</h3>     
                        </div>
                        
                        <div className='mainphoto-container'>
                            {post.image_path.map((image, index) => (
                            <img key={index} src={`http://localhost:4000${image}`} alt={post.title} style={{ maxWidth: '300px', marginRight: '10px' }} /> ))}
                        </div>
                        
                        <div className="mainpost-content">
                            <p>{post.content}</p>
                        </div> 
                    </li>
                );
                })}
            </ul>
        </div>
    )
}

export default Mainpost;
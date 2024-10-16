import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './Account.css';
import { useParams } from 'react-router-dom';
import EditModal from '../modal/Editmodal';

function Account() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    // State for modal
    const [modalOpen, setModalOpen] = useState(false);
    const [editingField, setEditingField] = useState('');
    const [newFieldValue, setNewFieldValue] = useState('');

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserInfoData = async () => {
            try {
                const response = await axios.get(`/users/${userId}`); ///CHANGE WHEN USER LOGIN
                setUser(response.data);
            } catch (err) {
                setError('Failed to fetch users info')
            }
        };

        fetchUserInfoData();
    }, [id]);

    // Open the modal to edit a specific field
    const openEditModal = (field, currentValue) => {
        setEditingField(field);
        setNewFieldValue(currentValue || ''); // Set the current value in the modal
        setModalOpen(true);
    };

    // Close modal without saving
    const closeModal = () => {
        setModalOpen(false);
        setNewFieldValue('');
    };

    // Handle input change in the modal
    const handleInputChange = (e) => {
        setNewFieldValue(e.target.value);
    };

    // Save changes and update user info
    const handleSave = async () => {
        try {
        await axios.put(`/users/edituser/${userId}`, { [editingField]: newFieldValue }); ///CHANGE WHEN USER LOGIN
        setUser({ ...user, [editingField]: newFieldValue }); // Update UI
        closeModal(); // Close the modal
        setError(null); // Clear any previous errors
        } catch (error) {
        setError('Failed to update user info');
        }
    };

    if (error) {
        return <div>{error}</div>;
      }

  return (
    <div className='account-container'>
        <div className='account-header'>
            <h3>Account Setting</h3>
            <div className='account-info'>

                {/* Firstname */}
                <div className='info-first'>
                    Forename: {user.firstname}
                    <button onClick={() => openEditModal('firstname', user.firstname)}>
                        Edit
                    </button>
                </div>

                {/* Lastname */}
                <div className='info-last'>
                    Surname: {user.lastname}
                    <button onClick={() => openEditModal('lastname', user.lastname)}>
                        Edit
                    </button>
                </div>

                {/* Username */}
                <div className='info-username'>
                    Username: {user.username}
                    <button onClick={() => openEditModal('username', user.username)}>
                        Edit
                    </button>
                </div>

                {/* Email */}
                <div className='info-email'>
                    Email: {user.email}
                    <button onClick={() => openEditModal('email', user.email)}>
                        Edit
                    </button>
                </div>

                {/* Location */}
                <div className='info-location'>
                    Location: {user.location}
                    <button onClick={() => openEditModal('location', user.location)}>
                        Edit
                    </button>
                </div>

            </div>          
        </div>

         {/* Edit Modal */}
        <EditModal
            isOpen={modalOpen}
            onClose={closeModal}
            onSave={handleSave}
            field={editingField}
            value={newFieldValue}
            onChange={handleInputChange}
        />
    </div>
  )
}

export default Account
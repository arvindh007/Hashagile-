import React, { useState } from 'react';
import axios from 'axios';

function CreateCollection() {
    const [collectionName, setCollectionName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateCollection = async () => {
        try {
            const response = await axios.post('http://localhost:5000/createCollection', { collection_name: collectionName });
            setMessage(response.data.message);
            setCollectionName(''); // Clear input field after submission
        } catch (error) {
            setMessage('Error creating collection.');
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
            <h2>Create Collection</h2>
            <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Enter Collection Name"
                style={{ padding: '5px', width: '30%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <br />
            <button
                style={{
                    padding: '5px 10px',
                    width: '30%',
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
                onClick={handleCreateCollection}
            >
                Create Collection
            </button>
            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
        </div>
    );
}

export default CreateCollection;

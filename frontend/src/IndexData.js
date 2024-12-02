import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IndexData() {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [excludeColumn, setExcludeColumn] = useState('');
    const [message, setMessage] = useState('');

    // Fetch collections when the component mounts
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getCollections'); // Fetch collections from backend
                setCollections(response.data);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };
        fetchCollections();
    }, []);

    const handleIndexData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/indexData', {
                collection_name: selectedCollection,
                exclude_column: excludeColumn,
            });
            setMessage(response.data.message); // Show the success message
        } catch (error) {
            console.error('Error during indexing:', error);
            setMessage('Indexing failed');
        }
    };

    return (
        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
            <h3>Index Data to Collection</h3>
            <select
                style={{ padding: '5px', width: '30%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
            >
                <option value="">Select Collection</option>
                {collections.map((collection, index) => (
                    <option key={index} value={collection}>{collection}</option>
                ))}
            </select>

            <br />

            <input
                style={{ padding: '5px', width: '30%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                type="text"
                value={excludeColumn}
                onChange={(e) => setExcludeColumn(e.target.value)}
                placeholder="Exclude Column"
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
                onClick={handleIndexData}
            >
                Index Data
            </button>

            {/* Display response message */}
            {message && (
                <div style={{ marginTop: '20px', color: message.includes('failed') ? 'red' : 'green' }}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default IndexData;

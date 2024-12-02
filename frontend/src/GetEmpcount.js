import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetEmpCount() {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [empCount, setEmpCount] = useState(null);

    // Fetch collections on component mount
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getCollections');
                setCollections(response.data);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };
        fetchCollections();
    }, []);

    const handleGetCount = async () => {
        try {
            const response = await axios.post('http://localhost:5000/getEmpCount', {
                collection_name: selectedCollection
            });
            setEmpCount(response.data.employee_count);
        } catch (error) {
            console.error('Error fetching employee count:', error);
        }
    };

    return (
        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
            {/* Dropdown for selecting collection */}
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
            {/* Button to get employee count */}
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
                onClick={handleGetCount}
                disabled={!selectedCollection}  // Disable the button until a collection is selected
            >
                Get Employee Count
            </button>

            {/* Display employee count */}
            {empCount !== null && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Total Employee Count: {empCount}</h3>
                </div>
            )}
        </div>
    );
}

export default GetEmpCount;

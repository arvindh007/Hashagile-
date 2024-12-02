import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteEmployee() {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState('');

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

    const handleDelete = async () => {
        try {
            const response = await axios.post('http://localhost:5000/delEmpById', {
                collection_name: selectedCollection,
                employee_id: employeeId
            });
            setMessage(`Employee ${employeeId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting employee:', error);
            setMessage(`Failed to delete employee: ${error.message}`);
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
            {/* Input for employee ID */}
            <input
                style={{ padding: '5px', width: '30%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter Employee ID"
            />
            <br />
            {/* Button to delete employee */}
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
                onClick={handleDelete}
                disabled={!selectedCollection || !employeeId}  // Disable button until both fields are filled
            >
                Delete Employee
            </button>

            {/* Display result message */}
            {message && (
                <div style={{ marginTop: '20px' }}>
                    <h3>{message}</h3>
                </div>
            )}
        </div>
    );
}

export default DeleteEmployee;

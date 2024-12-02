import React, { useState } from 'react';
import axios from 'axios';

function DeleteDocument() {
    const [employeeId, setEmployeeId] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/delete/${employeeId}`);
            alert('Document deleted successfully!');
            console.log('Document deleted:', response.data);
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Delete Document by Employee ID</h2>
            <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Employee ID"
                style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <br />
            <button
                onClick={handleDelete}
                style={{ width: '30%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Delete Document
            </button>
        </div>
    );
}

export default DeleteDocument;

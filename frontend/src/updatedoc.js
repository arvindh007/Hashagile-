import React, { useState } from 'react';
import axios from 'axios';

function UpdateDocument() {
    const [employeeId, setEmployeeId] = useState('');
    const [updateData, setUpdateData] = useState({
        fullName: '',
        jobTitle: '',
        department: ''
    });

    const handleChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/update/${employeeId}`, {
                "Full Name": updateData.fullName,
                "Job Title": updateData.jobTitle,
                "Department": updateData.department
            });
            alert('Document updated successfully!');
            console.log('Document updated:', response.data);
        } catch (error) {
            console.error('Error updating document:', error);
            alert('Failed to update document');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Update Document</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Employee ID"
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <input
                        type="text"
                        name="fullName"
                        value={updateData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        name="jobTitle"
                        value={updateData.jobTitle}
                        onChange={handleChange}
                        placeholder="Job Title"
                        style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        name="department"
                        value={updateData.department}
                        onChange={handleChange}
                        placeholder="Department"
                        style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button
                        type="submit"
                        style={{ width: '30%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Update Document
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateDocument;

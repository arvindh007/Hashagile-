import React, { useState } from 'react';
import axios from 'axios';

function CreateDocument() {
    const [formData, setFormData] = useState({
        employeeId: '',
        fullName: '',
        jobTitle: '',
        department: '',
        gender: '',
        age: '',
        country: '',
        city: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/create', {
                "Employee ID": formData.employeeId,
                "Full Name": formData.fullName,
                "Job Title": formData.jobTitle,
                "Department": formData.department,
                "Gender": formData.gender,
                "Age": formData.age,
                "Country": formData.country,
                "City": formData.city
            });
            alert('Document created successfully!');
            console.log('Document created:', response.data);
        } catch (error) {
            console.error('Error creating document:', error);
            alert('Failed to create document');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Create New Document</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="Employee ID"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    style={{ width: '30%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <br />
                <button
                    type="submit"
                    style={{ width: '30%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Create Document
                </button>
            </form>
        </div>
    );
}

export default CreateDocument;

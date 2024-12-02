import React, { useState } from 'react';
import axios from 'axios';
import './getdoc.css';  // Ensure you link your CSS

function GetDocument() {
    const [employeeId, setEmployeeId] = useState('');
    const [documentDetails, setDocumentDetails] = useState(null);

    const handleGet = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/document/${employeeId}`);
            setDocumentDetails(response.data);
        } catch (error) {
            console.error('Error fetching document:', error);
            setDocumentDetails(null);
        }
    };

    return (
        <div className="container">
            <h1>Elastic Search Document</h1>
            <h2>Fetch Document by Employee ID</h2>
            <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Employee ID"
            />
            <button onClick={handleGet}>Get Document</button>

            {documentDetails && (
                <div id="document-details">
                    <h3>Document Details:</h3>
                    <p><strong>Full Name:</strong> {documentDetails["Full Name"]}</p>
                    <p><strong>Age:</strong> {documentDetails.Age}</p>
                    <p><strong>Gender:</strong> {documentDetails.Gender}</p>
                    <p><strong>Job Title:</strong> {documentDetails["Job Title"]}</p>
                    <p><strong>Department:</strong> {documentDetails.Department}</p>
                    <p><strong>City:</strong> {documentDetails.City}</p>
                    <p><strong>Country:</strong> {documentDetails.Country}</p>
                </div>
            )}
        </div>
    );
}

export default GetDocument;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetDepFacet() {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [columns, setColumns] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [facetResults, setFacetResults] = useState([]);

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

    // Fetch columns when a collection is selected
    useEffect(() => {
        if (selectedCollection) {
            const fetchColumns = async () => {
                try {
                    const response = await axios.post('http://localhost:5000/getColumns', { collection_name: selectedCollection });
                    setColumns(response.data);
                } catch (error) {
                    console.error('Error fetching columns:', error);
                }
            };
            fetchColumns();
        }
    }, [selectedCollection]);

    const handleFacetSearch = async () => {
        try {
            const response = await axios.post('http://localhost:5000/getFacet', {
                collection_name: selectedCollection,
                facet_field: selectedColumn
            });
            setFacetResults(response.data);
        } catch (error) {
            console.error('Error during facet search:', error);
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

            {/* Dropdown for selecting column */}
            {selectedCollection && (
                <select
                    style={{ padding: '5px', width: '30%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                >
                    <option value="">Select Column</option>
                    {columns.map((column, index) => (
                        <option key={index} value={column}>{column}</option>
                    ))}
                </select>
            )}

            {/* Button to get facet */}
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
                onClick={handleFacetSearch}
                disabled={!selectedCollection || !selectedColumn}  // Disable button until both fields are filled
            >
                Get Facet
            </button>

            {/* Display facet results */}
            {facetResults.length > 0 && (
                <ul style={{ textAlign: 'left', marginTop: '20px', display: 'inline-block' }}>
                    {facetResults.map((result, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <strong>{result.key}:</strong> {result.doc_count} employees
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GetDepFacet;

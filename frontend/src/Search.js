import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [columns, setColumns] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [results, setResults] = useState([]);

    // Fetch collections on component mount
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getCollections');  // Adjusted the correct endpoint
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

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:5000/searchByColumn', {
                collection_name: selectedCollection,
                column_name: selectedColumn,
                column_value: query
            });
            setResults(response.data);  
        } catch (error) {
            console.error('Error during data fetch:', error);
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

            {/* Input for query */}
            <input
                style={{ padding: '5px', width: '30%', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <br />

            {/* Search Button */}
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
                onClick={handleSearch}
            >
                Search
            </button>

            {/* Display search results */}
            {results.length > 0 && (
                <ul style={{ textAlign: 'left', marginTop: '20px', display: 'inline-block' }}>
                    {results.map((result, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <strong>Employee ID:</strong> {result._source['Employee ID'] || 'No ID Provided'}, 
                            <strong>Name:</strong> {result._source['Full Name'] || 'No Name Provided'}, 
                            <strong>Job Title:</strong> {result._source['Job Title']},
                            <strong>Department:</strong> {result._source['Department']},
                            <strong>Gender:</strong> {result._source['Gender']},
                            <strong>Age:</strong> {result._source['Age']},
                            <strong>Country:</strong> {result._source['Country']},
                            <strong>City:</strong> {result._source['City']}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;

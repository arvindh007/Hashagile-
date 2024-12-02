import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Search from './Search';
import CreateDocument from './cdoc';
import GetDocument from './getdoc';
import UpdateDocument from './updatedoc';
import DeleteEmployee from './DeleteEmployee';
import GetEmpCount from './GetEmpcount';
import GetDepFacet from './GetDepFacet';  
import CreateCollection from './CreateCollection';  // Import CreateCollection component
import IndexData from './IndexData';  // Import IndexData component

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <h2>Welcome to Elastic search </h2>
                    <li><Link to="/">Search</Link></li>
                    <li><Link to="/create">Create Document</Link></li>
                    <li><Link to="/createCollection">Create Collection</Link></li> {/* Link to create collection */}
                    <li><Link to="/indexData">Index Data</Link></li> {/* Link to index data */}
                    <li><Link to="/get">Get Document</Link></li>
                    <li><Link to="/update">Update Document</Link></li>
                    <li><Link to="/deleteEmployee">Delete Employee</Link></li>
                    <li><Link to="/empcount">Get Employee Count</Link></li>
                    <li><Link to="/getDepFacet">Get Department Facet</Link></li> 
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/create" element={<CreateDocument />} />
                <Route path="/createCollection" element={<CreateCollection />} /> {/* Route for Create Collection */}
                <Route path="/indexData" element={<IndexData />} /> {/* Route for Index Data */}
                <Route path="/get" element={<GetDocument />} />
                <Route path="/update" element={<UpdateDocument />} />
                <Route path="/deleteEmployee" element={<DeleteEmployee />} />
                <Route path="/empcount" element={<GetEmpCount />} />
                <Route path="/getDepFacet" element={<GetDepFacet />} />
            </Routes>
        </Router>
    );
}

export default App;

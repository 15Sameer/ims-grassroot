import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputDesign from './InputDesign';
import Dashboard from './Dashboard';
import Volunteer from './Volunteer'; 
import Orders from './Orders';
import UpdateStock from'./UpdateStock';
import Reports from './Reports';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputDesign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/volunteer" element={<Volunteer />} /> {/* Add Volunteer route */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/updatestock" element={<UpdateStock />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
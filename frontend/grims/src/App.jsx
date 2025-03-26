import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputDesign from './InputDesign';
import Dashboard from './Dashboard';
import Volunteer from './Volunteer'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputDesign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/volunteer" element={<Volunteer />} /> {/* Add Volunteer route */}
      </Routes>
    </Router>
  );
}

export default App;
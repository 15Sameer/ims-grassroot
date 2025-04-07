import './InputDesign.module.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* This will use BrowserRouter from App.jsx */}
  </StrictMode>
);

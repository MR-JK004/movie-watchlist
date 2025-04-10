import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { ToastContainer} from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster/>
    <ToastContainer />
  </React.StrictMode>
);

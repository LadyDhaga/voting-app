import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container); // New way to create root
root.render(<App />);
registerServiceWorker();

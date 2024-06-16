import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import SortingVisualiser from './SortingVisualiser/SortingVisualiser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SortingVisualiser />
);

reportWebVitals();

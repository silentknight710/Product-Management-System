// src/App.js
import React from 'react';
import ProductList from './components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div className="container">
            <h1 className="my-4">Product Management System</h1>
            <ProductList />
        </div>
    );
};

export default App;

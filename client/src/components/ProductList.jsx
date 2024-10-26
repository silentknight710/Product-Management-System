
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async (product) => {
        await axios.post('http://localhost:5000/api/products', product);
        setShowForm(false); // Hide form after adding
        fetchProducts();
    };

    const handleUpdateProduct = async (product) => {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, product);
        setEditingProduct(null);
        fetchProducts();
        setShowForm(false); // Hide form after updating
    };

    const handleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
    };

    return (
        <div className="container">
            <h1 className="my-4">Product List</h1>
            <button onClick={() => { setShowForm(true); setEditingProduct(null); }} className="btn btn-primary">
                Add Product
            </button>
            
            {/* Conditionally show form */}
            {showForm && (
                <ProductForm
                    onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                    product={editingProduct}
                />
            )}

            <div className="d-flex flex-wrap">
                {products.map(product => (
                    <div key={product.id} className="card m-2" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">Price: ${product.price}</p>
                            <p className="card-text">Quantity: {product.quantity}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setEditingProduct(product);
                                    setShowForm(true);
                                }}
                            >
                                Edit
                            </button>
                            <button className="btn btn-danger ml-2" onClick={() => handleDeleteProduct(product.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
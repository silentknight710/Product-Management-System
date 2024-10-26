import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = ({ onSubmit, product }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { name: '', description: '', price: '', quantity: '', ...product },
    });

    // Reset form values if product changes (for edit mode)
    useEffect(() => {
        reset(product || { name: '', description: '', price: '', quantity: '' });
    }, [product, reset]);

    const handleFormSubmit = (data) => {
        // If editing, only submit changed fields
        const updatedData = product
            ? Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== product[key]))
            : data;

        onSubmit(updatedData);
        reset(); // Clear form after submission
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="my-4">
            <div className="mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input id="name" {...register('name', { required: true })} className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea id="description" {...register('description')} className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="price">Price</label>
                <input id="price" {...register('price', { required: true })} type="number" className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="quantity">Quantity</label>
                <input id="quantity" {...register('quantity', { required: true })} type="number" className="form-control" />
            </div>
            <button type="submit" className="btn btn-success">{product ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
};

export default ProductForm;
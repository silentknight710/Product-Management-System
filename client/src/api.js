const API_URL = 'http://localhost:5000/api/products';

export const getProducts = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const addProduct = async (product) => {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
};

export const updateProduct = async (id, product) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
};

export const deleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};


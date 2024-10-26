// tests/productRoutes.test.js
const request = require('supertest');
const { app, sequelize } = require('../index'); // Import app and sequelize
const Product = require('../models/Product.js'); // Your Product model

beforeEach(async () => {
    await Product.destroy({ where: {} }); // Clear the database before each test
});

afterAll(async () => {
    await sequelize.close(); // Close the Sequelize connection
});

describe('Product API', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Product',
                description: 'This is a test product',
                price: 100,
                quantity: 10,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Test Product');
    });

    it('should fetch all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should update a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            description: 'This is a test product',
            price: 100,
            quantity: 10,
        });

        const res = await request(app)
            .put(`/api/products/${product.id}`)
            .send({ name: 'Updated Product' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Updated Product');
    });

    it('should delete a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            description: 'This is a test product',
            price: 100,
            quantity: 10,
        });

        const res = await request(app).delete(`/api/products/${product.id}`);
        expect(res.statusCode).toEqual(204);
    });
    afterAll(async () => {
        await sequelize.close(); // Make sure to close the Sequelize connection
    });
    
});

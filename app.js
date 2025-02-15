const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const products = require('./data/products.json');
app.use(express.json());
app.get('/products', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        return res.json(filteredProducts);
    }
    res.send(products);
});
        
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.send(product);
});
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
    next();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Shoes API routes
const express = require('express');
const router = express.Router();

// Sample shoe data
const shoes = [
    {
        id: 1,
        name: 'Classic Sneaker',
        model: 'shoe.glb',
        colors: ['#ff6b6b', '#4ecdc4', '#95e1d3'],
        price: 99.99
    }
];

// GET all shoes
router.get('/', (req, res) => {
    res.json(shoes);
});

// GET single shoe
router.get('/:id', (req, res) => {
    const shoe = shoes.find(s => s.id === parseInt(req.params.id));
    if (!shoe) {
        return res.status(404).json({ message: 'Shoe not found' });
    }
    res.json(shoe);
});

// POST new shoe
router.post('/', (req, res) => {
    const newShoe = {
        id: shoes.length + 1,
        ...req.body
    };
    shoes.push(newShoe);
    res.status(201).json(newShoe);
});

module.exports = router;

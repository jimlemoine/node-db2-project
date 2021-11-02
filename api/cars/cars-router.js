const express = require('express');
const { checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique } = require('./cars-middleware');
const Car = require('./cars-model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await Car.getAll()
        res.json(data)
    } catch (err) {
        next(err)
    }
});

router.get('/:id', checkCarId, async (req, res, next) => {
    res.status(200).json(req.validCar)
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
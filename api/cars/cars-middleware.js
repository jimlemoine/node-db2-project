const Car = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const possibleCar = await Car.getById(req.params.id)
    if (possibleCar) {
      req.validCar = possibleCar
      next()
    } else {
      next({ status: 404, message: `car with id ${req.params.id} is not found`})
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json({ message: 'vin is missing'})
  } else if (!make) {
    res.status(400).json({ message: 'make is missing'})
  } else if (!model) {
    res.status(400).json({ message: 'model is missing'})
  } else if (!mileage) {
    res.status(400).json({ message: 'mileage is missing'})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next()
  } else {
    next({ status: 400, message: `vin ${vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  const cars = await Car.getAll();
  const dupe = cars.find(car => car.vin === vin)
  if (dupe) {
    next({ status: 400, message: `vin ${vin} already exists` })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
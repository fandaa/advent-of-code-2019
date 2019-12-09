const fuelForMass = mass => Math.floor(mass / 3.0) - 2

const data = require('fs').readFileSync('./data/1').toString()
const modulesMass = data.split('\n')

const totalFuelNeeded = modulesMass.reduce((sum, module) => {
	const moduleMass = parseInt(module)
	const fuelNeeded = fuelForMass(moduleMass)
	return sum + fuelNeeded
}, 0)

console.log('Fuel needed:', totalFuelNeeded)

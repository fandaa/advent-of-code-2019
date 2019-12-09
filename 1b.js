const fuelForMass = mass => Math.floor(mass / 3.0) - 2

const calculateFuel = mass => {
	let currentFuelNeeded = mass
	let totalFuelNeeeded = 0
	let fuelForFuel = 1

	while (fuelForFuel > 0) {
		fuelForFuel = fuelForMass(currentFuelNeeded)
		currentFuelNeeded = fuelForFuel

		if (fuelForFuel > 0) {
			totalFuelNeeeded += fuelForFuel
		}
	}

	return totalFuelNeeeded
}

const data = require('fs').readFileSync('./data/1').toString()
const modulesMass = data.split('\n')

const totalFuelNeeded = modulesMass.reduce((sum, module) => {
	const moduleMass = parseInt(module)
	const fuelForFuel = calculateFuel(moduleMass)
	return sum + fuelForFuel
}, 0)

console.log('Total fuel needed:', totalFuelNeeded)

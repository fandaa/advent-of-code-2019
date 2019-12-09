
const pointAsKey = (x, y) => `${x},${y}`
const keyAsPoint = key => key.split(',').map(p => parseInt(p))

const createPointMarker = ({ usedPoints, crossingPoints }) => ({ x, y, pathIndex }) => {
	const key = pointAsKey(x, y)
	if (usedPoints[key]) {
		if (usedPoints[key].indexOf(pathIndex) === -1) {
			crossingPoints[key] = 1
			usedPoints[key]++
		}
	} else {
		usedPoints[key] = [pathIndex]
	}
}

const calculateLowestDistance = paths => {
	const crossingPoints = {}
	const usedPoints = {}

	const markPoint = createPointMarker({ usedPoints, crossingPoints })

	paths.forEach((path, pathIndex) => {
		const pathPoints = path.split(',')

		let x = 0
		let y = 0

		pathPoints.forEach(point => {
			const direction = point[0].toUpperCase()
			const stepsCount = parseInt(point.slice(1))
			let stepFn

			switch (direction) {
				case 'U': stepFn = (x, y) => [x, y + 1]; break
				case 'D': stepFn = (x, y) => [x, y - 1]; break
				case 'L': stepFn = (x, y) => [x - 1, y]; break
				case 'R': stepFn = (x, y) => [x + 1, y]; break
				default: throw new Error('Unknown direction')
			}
			
			for (let i = 0; i < stepsCount; i++) {
				[x, y] = stepFn(x, y)
				markPoint({ x, y, pathIndex })
			}
		})
	})

	const manhattanDistances = Object.keys(crossingPoints).map(key => {
		const [x, y] = keyAsPoint(key)
		return Math.abs(x) + Math.abs(y)
	})

	return Math.min(...manhattanDistances)
}


const t1 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`.split('\n')
console.log('Test 1:', calculateLowestDistance(t1), '(should be 159)')

const t2 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`.split('\n')
console.log('Test 2:', calculateLowestDistance(t2), '(should be 139)')

const paths = require('fs').readFileSync('./data/3').toString().split('\n')
console.log('Lowest distance from data:', calculateLowestDistance(paths))

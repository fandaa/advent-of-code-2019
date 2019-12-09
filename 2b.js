
const createMemory = memoryValuesByIndex => memoryValuesByIndex.reduce((mem, value, index) => {
	mem[index] = parseInt(value)
	return mem
}, {})

const createMemoryReader = memory => address => memory[address]
const createMemoryWriter = memory => (address, value) => memory[address] = value

const processor = ({ getMemoryCell, writeMemoryCell }) => {
	let halt = false
	let instructionPointer = 0

	while (true) {
		const token = getMemoryCell(instructionPointer)
		let srcAddr1, srcAddr2, destAddr, destValue

		switch (token) {
			case 1: 
				srcAddr1 = getMemoryCell(++instructionPointer)
				srcAddr2 = getMemoryCell(++instructionPointer)
				destAddr = getMemoryCell(++instructionPointer)
				destValue = getMemoryCell(srcAddr1) + getMemoryCell(srcAddr2)
				writeMemoryCell(destAddr, destValue)
			break

			case 2:
				srcAddr1 = getMemoryCell(++instructionPointer)
				srcAddr2 = getMemoryCell(++instructionPointer)
				destAddr = getMemoryCell(++instructionPointer)
				destValue = getMemoryCell(srcAddr1) * getMemoryCell(srcAddr2)
				writeMemoryCell(destAddr, destValue)
			break

			case 99:
				halt = true
			break
		}

		if (halt) {
			break
		}

		instructionPointer++
	}
}

function main () {
	const data = require('fs').readFileSync('./data/2').toString()
	const instructions = data.split(',')

	const neededAddressZeroValue = 19690720
	const initialMemory = createMemory(instructions)
	
	let halt = false
	let noun = 0
	let verb = 0

	for (noun = 0; noun < 100; noun++) {
		for (verb = 0; verb < 100; verb++) {
			const patchedMemory = {
				...initialMemory,
				1: noun,
				2: verb,
			}
			const getMemoryCell = createMemoryReader(patchedMemory)
			const writeMemoryCell = createMemoryWriter(patchedMemory)
		
			processor({
				getMemoryCell,
				writeMemoryCell,
			})

			if (getMemoryCell(0) === neededAddressZeroValue) {
				halt = true
				break
			}
		}

		if (halt) {
			break
		}
	}

	console.log('Found noun & verb:', { noun, verb })
}

main()

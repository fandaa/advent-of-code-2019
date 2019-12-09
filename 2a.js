
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

	const initialMemory = createMemory(instructions)
	
	const patchedMemory = {
		...initialMemory,
		1: 12,
		2: 2,
	}

	const getMemoryCell = createMemoryReader(patchedMemory)
	const writeMemoryCell = createMemoryWriter(patchedMemory)

	processor({
		getMemoryCell,
		writeMemoryCell,
	})

	console.log('Memory 0 from data:', getMemoryCell(0))
}

main()

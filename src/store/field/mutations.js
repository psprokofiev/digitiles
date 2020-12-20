export function setSubmitValue (state, value) {
	state.submitValue = value
	setSubmitDisabled(state, false)
}

export function setRandomSubmitValue (state) {
	let min = state.startValue,
		max = state.maxValue,
		pow = state.getPow(max, min),
		randomPow = state.setRand(1, pow)

	setSubmitValue(state, min ** randomPow)
}

export function setTileValue (state, data) {
	let row = data.row,
		column = data.column,
		cellsRow = Object.assign([], state.cells[row])

	cellsRow.splice(column, 1, data.value)
	state.cells.splice(row, 1, cellsRow)

	calculateNeighbours(state, data)
}

function calculateNeighbours (state, data) {
	if (data.start || !data.value) {
		return
	}

	let neighbours = [
		{
			label: 'self',
			row: data.row,
			column: data.column,
			value: state.cells[data.row] ? state.cells[data.row][data.column] : null,
		},
		{
			label: 'up',
			row: data.row - 1,
			column: data.column,
			value: state.cells[data.row - 1] ? state.cells[data.row - 1][data.column] : null,
		},
		{
			label: 'left',
			row: data.row,
			column: data.column - 1,
			value: state.cells[data.row] ? state.cells[data.row][data.column - 1] : null,
		},
		{
			label: 'right',
			row: data.row,
			column: data.column + 1,
			value: state.cells[data.row] ? state.cells[data.row][data.column + 1] : null,
		},
	]

	neighbours = neighbours.filter(item => {
		return !!item.value && item.value === data.value
	})

	if (neighbours.length === 1) {
		return
	}

	let pow = state.getPow(data.value, state.startValue),
		sum = state.startValue ** (pow + neighbours.length - 1),
		hasUp = neighbours.find(item => item.label === 'up'),
		target = hasUp || neighbours[0]

	if (!target) {
		// submit to empty column
		return
	}

	neighbours.forEach(item => {
		// console.log(item)
		if (target.label === item.label) {
			return
		}

		setTileValue(state, {
			row: item.row,
			column: item.column,
			value: null,
		})
	})

	setTileValue(state, {
		row: target.row,
		column: target.column,
		value: sum,
		// start: true,
	})

	// calculateNeighbours(state, {
	// 	row: target.row + 1,
	// 	column: target.column,
	// 	value: sum,
	// })
}

export function initializeField (state, size) {
	for (let row = 0; row < size; row++) {
		state.cells.push([])
		for (let column = 0; column < size; column++) {
			state.cells[row].push(null)
		}
	}
}

export function setSubmitDisabled (state, disabled) {
	state.submitDisabled = disabled
}

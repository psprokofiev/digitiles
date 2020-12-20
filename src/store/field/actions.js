import { Notify } from 'quasar'

export function start (context) {
	context.commit('initializeField', context.getters['getSize'])

	setTimeout(() => {
		generateStartTiles(context)
	}, 250)

	setTimeout(() => {
		setSubmitRandom(context, true)
	}, 500)
}

function generateStartTiles (context) {
	for (let column = 0; column < context.getters['getSize']; column++) {
		let minValue = context.getters['getStartValue'],
			maxValue = context.getters['getMaxValue'],
			pow = context.state.getPow(maxValue, minValue),
			randomPow = context.state.setRand(1, pow)

		context.commit('setTileValue', {
			row: 0,
			column: column,
			value: minValue ** randomPow,
			start: true,
		})
	}
}

export function setSubmitRandom (context, start) {
	start
		? context.commit('setSubmitValue', context.getters['getStartValue'])
		: context.commit('setRandomSubmitValue')
}

export function submitTile (context, position) {
	context.commit('setSubmitDisabled', true)

	let value = context.getters['getSubmitValue'],
		cells = context.getters['getCells'],
		cellRow = 0

	cells.forEach((row, i) => {
		if (!!row[position]) {
			cellRow = i + 1
			return true
		}
	})

	if (cellRow > context.getters['getSize']) {
		Notify.create('Full stack')
		context.commit('setSubmitDisabled', false)
		return
	}

	context.commit('setTileValue', {
		row: cellRow,
		column: position,
		value: value,
	})

	context.dispatch('setSubmitRandom')
}

const base = 2

const getPow = (value, base) => {
	return Math.log(value) / Math.log(base)
}

const setRand = (min, max) => {
	return Math.floor(Math.random() * max) + min
}

const getColor = (value) => {
	let pow = getPow(value, base),
		colors = [
			null,
			'#00c044',
			'#0068c0',
			'#c0009e',
			'#6c00c0',
			'#c0001b',
			'#0024c0',
			'#c0ac00',
			'#c03b00',
			'#4400c0',
			'#c06800',
			'#71c000',
			'#4800c0',
			'#c00000',
		]

	return colors[pow]
}

export default function () {
	return {
		size: 5,

		startValue: base,
		maxValue: base ** 5,

		submitPosition: null,
		submitValue: null,
		submitDisabled: true,

		cells: [],

		setRand: setRand,
		getPow: getPow,
		getColor: getColor,
	}
}

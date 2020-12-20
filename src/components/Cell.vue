<template>
    <div class="cell relative-position full-width full-height rounded-borders row items-center text-white"
         :style="cellStyle">
        <q-badge v-if="1===2" class="position-label absolute-top-right" color="grey-6" :label="label" />
        <transition enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut"
                    appear>
            <div v-if="value" v-html="value" class="col text-center text-h6" />
        </transition>
    </div>
</template>

<script>
	export default {
		name: 'Cell',

		data () {
			return {
				rowIndex: this.row,
				columnIndex: this.column,
			}
		},

		props: {
			row: {
				type: Number,
				required: true,
			},
			column: {
				type: Number,
				required: true,
			},
		},

		computed: {
			label () {
				return this.row + '/' + this.column
			},

			value () {
				return this.$store.state.field.cells[this.rowIndex][this.columnIndex]
			},

			cellStyle () {
				if (!this.value) {
					return {
						borderColor: '#aaa',
					}
				}
				let color = this.$store.state.field.getColor(this.value)
				return {
					borderColor: color,
					backgroundColor: color,
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
    .cell {
        border-style: solid;
        border-width: 1px;

        .position-label {
            margin-top: -0.25rem;
            margin-right: -0.25rem;
        }
    }
</style>

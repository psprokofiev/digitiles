<template>
    <div>
        <transition enter-active-class="animated fadeInDown"
                    leave-active-class="animated fadeOut"
                    appear>
            <div class="q-gutter-y-sm">
                <div v-for="row in fieldSize" :key="`row${row}`" class="row q-gutter-x-sm">
                    <div v-for="column in fieldSize" :key="`column${column}`"
                         class="col-auto"
                         :style="cellSizeStyle">
                        <Cell v-if="$store.state.field.cells.length > 0"
                              :column="column - 1"
                              :row="row - 1" />
                    </div>
                </div>
            </div>
        </transition>
        <div class="row q-gutter-x-sm">
            <div class="col br-cell" :style="cellSizeStyle" />
        </div>
        <transition enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOut"
                    appear>
            <div class="row q-gutter-x-sm">
                <div v-for="column in fieldSize" :key="`ft-column${column}`"
                     class="col-auto ft-cell relative-position"
                     :style="cellSizeStyle">
                    <q-btn push dense color="primary"
                           class="full-width full-height submit-button"
                           icon="la la-angle-up"
                           :disable="$store.state.field.submitDisabled"
                           @click="submit(column - 1)" />
                </div>
            </div>
        </transition>
        <transition enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOut"
                    appear>
            <div class="row q-gutter-x-sm justify-center q-mt-md">
                <div class="col-auto ft-cell relative-position"
                     :style="cellSizeStyle">
                    <div :style="{backgroundColor: submitColor}"
                         class="full-width full-height rounded-borders text-white row items-center">
                        <div class="col text-center text-h6">{{ submitValue }}</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
	import Cell from 'components/Cell'

	export default {
		name: 'Field',

		computed: {
			fieldSize () {
				return this.$store.state.field.size
			},

			cellSizeStyle () {
				if (this.$q.screen.lt.sm) {
					let size = Math.ceil(0.75 * 100 / this.fieldSize)
					return {
						width: size + 'vw',
						height: size + 'vw',
					}
				}
				let size = Math.ceil(0.7 * 100 / (this.fieldSize + 2))
				return {
					width: size + 'vh',
					height: size + 'vh',
				}
			},

			submitValue () {
				return this.$store.state.field.submitValue
			},

			submitColor () {
				return this.$store.state.field.getColor(this.submitValue)
			},
		},

		methods: {
			submit (column) {
				this.$store.dispatch('field/submitTile', column)
			},
		},

		mounted () {
			this.$store.dispatch('field/start')
		},

		components: {
			Cell,
		},
	}
</script>

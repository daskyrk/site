<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="30"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      :value="formattedRange"
      readonly
    />

    <v-date-picker
      class="date-range-picker"
      :value="value"
      :events="selectedRange"
      :allowed-dates="allowedDates"
      no-title
      multiple
      @input="onInput"
    >
      <v-spacer />
      <v-btn
        color="primary"
        flat
        @click="menu = false"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    allowedDates: Function,
  },
  data() {
    return {
      dateRange: [],
      menu: false,
      dates: [],
    }
  },
  computed: {
    formattedRange () {
      if (this.dateRange.length) {
        let range = moment(this.dateRange[0]).format('D MMM')
        if (this.value[1]) {
          range += ' - ' + moment(this.dateRange[1]).format('D MMM')
        }
        return range
      }
      return []
    }
  },
  watch: {
    value(val) {
      this.dates = val
    },
  },
  created() {
    this.dates = this.value
  },
  methods: {
    diff(a, b) {
      return a.filter(v => !b.includes(v))
    },
    onInput(val) {
      let newRange
      if (val.length > 2) {
        let newDate = this.diff(val, this.dates)[0]
        let currentRange = this.dates.sort()
        newRange = [currentRange[0], newDate]
      } else {
        newRange = val
      }
      this.dates = newRange.sort()
      this.$emit('input', this.dates)
    },
    selectedRange(date) {
      if (this.dates.length == 2) {
        return moment(date).isBetween(...this.dates)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.date-range-picker
  >>> .v-date-picker-table__events
    height 32px
    width 32px
    z-index 0
    left -2px
    top -1px
  >>> .date-in-range
    height 32px
    width 32px
  >>> .v-btn__content
    z-index 1
</style>

<template>
    <div id="app">
        <div class="calendar">
            <nav>
                <div class="control-btn prev-btn" @click="toPrevMonth">&#8249;</div>
                <span class="nav-title">{{ currentMonthYear }}</span>
                <div class="control-btn next-btn" @click="toNextMonth">&#8250;</div>
            </nav>

            <div class="weekdays">
                <div v-for="weekday in weekdays" :key='weekday' class="weekday">{{ weekday }}</div>
            </div>

            <div class="days">
                <div v-for="day in prevMonthDays" :key="`${day}prev`" class="day prev-month-day">
                    {{ day }}
                </div>

                <div v-for="day in currentMonthDays" :key="`${day}current`" class="day">
                    <div v-if="day === 1" class="month-label">{{ currentMonth }}</div>
                    {{ day }}
                </div>

                <div v-for="day in nextMonthDays" :key="`${day}next`" class="day next-month-day">
                    <div v-if="day === 1" class="month-label">{{ nextMonth }}</div>
                    {{ day }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
        data () {
            return {
                currentMonthYear: '',
                currentMonth: '',
                nextMonth: '',

                prevMonthDays: [],
                currentMonthDays: [],
                nextMonthDays: [],

                weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                cellNumber: 42
            }
        },

        mounted() {
            const monthStart = this.$moment.startOf('month')
            this.setLabels()
            this.renderDays(monthStart)
        },

        methods: {
            setLabels() {
                this.currentMonthYear = this.$moment.format('MMMM YYYY')
                this.currentMonth = this.$moment.format('MMM').toUpperCase()
                this.nextMonth = this.$moment.clone().add(1, 'months').format('MMM').toUpperCase()
            },

            renderDays(monthStart) {
                if (this.currentMonthDays.length) {
                    this.clearDays()
                }
                const monthStartDay = monthStart.weekday()

                for (let i = 0; i < monthStart.daysInMonth(); i++) {
                    this.currentMonthDays.push(i + 1)
                }
                if (monthStartDay > 0) {
                    let prevMonthEnd = this.$moment.clone().date(0).format('DD')

                    while (this.prevMonthDays.length < monthStartDay) {
                        this.prevMonthDays.unshift(prevMonthEnd)
                        prevMonthEnd--
                    }
                }

                let diff = this.cellNumber - (this.prevMonthDays.length + this.currentMonthDays.length)
                for (let i = 0; i < diff; i++) {
                    this.nextMonthDays.push(i + 1)
                }
            },

            toPrevMonth() {
                const monthStart = this.$moment.subtract(1, 'months').startOf('month')
                this.setLabels()
                this.renderDays(monthStart)
            },

            toNextMonth() {
                const monthStart = this.$moment.add(1, 'months').startOf('month')
                this.setLabels()
                this.renderDays(monthStart)
            },

            clearDays() {
                this.prevMonthDays = []
                this.currentMonthDays = []
                this.nextMonthDays = []
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 25px;
    }
    .calendar {
        width: 428px;
        padding-top: 10px;
        border: 1px solid #f0f0f4;
    }
    nav {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        align-items: baseline;
        margin-bottom: 20px;
        color: #5c5d5e;
        .control-btn {
            font-size: 35px;
            line-height: 1;
            cursor: pointer;
            user-select: none;
        }
        .nav-title {
            font-size: 20px;
        }
    }
    .days,
    .weekdays { 
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .weekdays {
        border-bottom: 1px solid #f0f0f4;
        .weekday {
            padding: 4px;
            font-size: 13px;
            color: #b3b3b3;
        }
    }
    .days {
        grid-template-rows: repeat(6, 1fr);
        .day {
            position: relative;
            height: 30px;
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
            &.prev-month-day,
            &.next-month-day {
                background-color: #fcf9fc;
            }
        }
    }
    .month-label {
        position: absolute;
        top: 3px;
        left: 0;
        width: 100%;
        font-size: 10px;
        line-height: 1;
        color: #b3b3b3;
    }
</style>

import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

moment.updateLocale('en', {
    week: {
        dow: 1,
    }
})

Vue.prototype.$moment = moment()

Vue.config.productionTip = false

new Vue({
    render: function (h) { return h(App) },
}).$mount('#app')

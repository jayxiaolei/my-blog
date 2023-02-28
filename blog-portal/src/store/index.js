import {createStore} from 'vuex'

export default createStore({
    state: {
        scrollTop: 0
    },
    mutations: {
        getScrollTop(state) {
            state.scrollTop = document.documentElement.scrollTop
        }
    },
    actions: {},
    modules: {}
})
import Client from '../client'

export default {
    install(Vue, options) {
        Vue.prototype.$spotifyClient = new Client(options)
    }
};
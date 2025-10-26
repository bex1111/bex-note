import {defineStore} from 'pinia'


export const useAuthorizationStore = defineStore('authorization', {
    state: () => ({
        token: null
    }),
    actions: {
        resetToken() {
            this.token = null
        }
    }
})
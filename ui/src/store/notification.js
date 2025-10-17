import {defineStore} from 'pinia'


export const useNotificationStore = defineStore('notification', {
    state: () => ({
        type: null,
        message: null
    })
})
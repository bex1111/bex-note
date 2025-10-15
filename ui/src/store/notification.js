import {defineStore} from 'pinia'


export const useNotificationStore = defineStore('notification', {
    state: () => ({
        error: null,
        success: null
    })
})
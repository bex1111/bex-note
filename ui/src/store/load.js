import {defineStore} from 'pinia'

export const useLoadStore = defineStore('load', {
    state: () => ({
        loading: false
    })
})
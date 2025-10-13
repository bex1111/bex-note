import {defineStore} from 'pinia'
import {ref} from "vue";


export const useAuthorizationStore = defineStore('authorization', () => {
    const token = ref()
    const setToken = (newToken) => {
        token.value = newToken
    }
    const getToken = () => token.value
    return {setToken, getToken}
})
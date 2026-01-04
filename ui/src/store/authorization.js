import {defineStore} from 'pinia'
import {eraseCookie, getCookie, setCookie} from './cookie'

const COOKIE_NAME = 'auth_token';

export const useAuthorizationStore = defineStore('authorization', {
    state: () => ({
        token: getCookie(COOKIE_NAME) || null
    }),
    actions: {
        resetToken() {
            this.token = null
            eraseCookie(COOKIE_NAME)
        },
        saveToken(token) {
            this.token = token
            setCookie(COOKIE_NAME, token, 180)
        }
    }
})
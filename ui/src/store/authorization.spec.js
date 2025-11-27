import { setActivePinia, createPinia } from 'pinia'
import { vi } from 'vitest'
import { useAuthorizationStore } from './authorization'
import { getCookie, setCookie, eraseCookie } from './cookie'

// Mock the cookie module
vi.mock('./cookie', () => ({
    getCookie: vi.fn(),
    setCookie: vi.fn(),
    eraseCookie: vi.fn()
}))

describe('Authorization Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    describe('initialization', () => {
        it('initializes token from cookie when cookie exists', () => {
            getCookie.mockReturnValue('stored-token-123')

            const store = useAuthorizationStore()

            expect(getCookie).toHaveBeenCalledWith('auth_token')
            expect(store.token).toBe('stored-token-123')
        })

        it('initializes token as null when cookie is empty', () => {
            getCookie.mockReturnValue('')

            const store = useAuthorizationStore()

            expect(getCookie).toHaveBeenCalledWith('auth_token')
            expect(store.token).toBeNull()
        })

        it('initializes token as null when cookie does not exist', () => {
            getCookie.mockReturnValue(null)

            const store = useAuthorizationStore()

            expect(getCookie).toHaveBeenCalledWith('auth_token')
            expect(store.token).toBeNull()
        })
    })

    describe('saveToken', () => {
        it('saves token to store and cookie', () => {
            getCookie.mockReturnValue(null)
            const store = useAuthorizationStore()

            store.saveToken('new-token-456')

            expect(store.token).toBe('new-token-456')
            expect(setCookie).toHaveBeenCalledWith('auth_token', 'new-token-456', 30)
        })

        it('overwrites existing token', () => {
            getCookie.mockReturnValue('old-token')
            const store = useAuthorizationStore()

            store.saveToken('updated-token')

            expect(store.token).toBe('updated-token')
            expect(setCookie).toHaveBeenCalledWith('auth_token', 'updated-token', 30)
        })
    })

    describe('resetToken', () => {
        it('resets token to null and erases cookie', () => {
            getCookie.mockReturnValue('existing-token')
            const store = useAuthorizationStore()

            expect(store.token).toBe('existing-token')

            store.resetToken()

            expect(store.token).toBeNull()
            expect(eraseCookie).toHaveBeenCalledWith('auth_token')
        })

        it('can reset token when it was already null', () => {
            getCookie.mockReturnValue(null)
            const store = useAuthorizationStore()

            store.resetToken()

            expect(store.token).toBeNull()
            expect(eraseCookie).toHaveBeenCalledWith('auth_token')
        })
    })

    describe('token lifecycle', () => {
        it('can save and reset token multiple times', () => {
            getCookie.mockReturnValue(null)
            const store = useAuthorizationStore()

            store.saveToken('token-1')
            expect(store.token).toBe('token-1')
            expect(setCookie).toHaveBeenCalledWith('auth_token', 'token-1', 30)

            store.resetToken()
            expect(store.token).toBeNull()
            expect(eraseCookie).toHaveBeenCalledWith('auth_token')

            store.saveToken('token-2')
            expect(store.token).toBe('token-2')
            expect(setCookie).toHaveBeenCalledWith('auth_token', 'token-2', 30)

            expect(setCookie).toHaveBeenCalledTimes(2)
            expect(eraseCookie).toHaveBeenCalledTimes(1)
        })
    })
})

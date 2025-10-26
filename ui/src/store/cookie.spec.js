import { vi } from 'vitest'
import { getCookie, setCookie, eraseCookie } from './cookie'


Object.defineProperty(document, 'cookie', {
    writable: true,
    value: ''
})

describe('Cookie helpers', () => {
    beforeEach(() => {
        document.cookie = ''
    })

    describe('setCookie', () => {
        it('sets cookie with name, value and expiration', () => {
            const mockDate = new Date('2025-10-26T00:00:00.000Z')
            vi.setSystemTime(mockDate)

            setCookie('cookie', 'value', 7)

            expect(document.cookie).toEqual('cookie=value;expires=Sun, 02 Nov 2025 00:00:00 GMT;path=/;Secure;')

            vi.useRealTimers()
        })
    })

    describe('getCookie', () => {
        it('returns cookie value when cookie exists', () => {
            document.cookie = 'test_cookie=test_value; path=/'

            const result = getCookie('test_cookie')

            expect(result).toBe('test_value')
        })

        it('returns empty string when cookie does not exist', () => {
            document.cookie = 'other_cookie=other_value; path=/'

            const result = getCookie('nonexistent_cookie')

            expect(result).toBeNull()
        })

        it('returns correct value when multiple cookies exist', () => {
            document.cookie = 'cookie1=value1;expires=Sun, 02 Nov 2025 00:00:00 GMT;path=/;Secure;' +
                'cookie2=value2;expires=Sun, 02 Nov 2025 00:00:00 GMT;path=/;Secure;' +
                'cookie3=value3;expires=Sun, 02 Nov 2025 00:00:00 GMT;path=/;Secure;'

            expect(getCookie('cookie1')).toBe('value1')
            expect(getCookie('cookie2')).toBe('value2')
            expect(getCookie('cookie3')).toBe('value3')
        })

        it('returns null for not existing cookie', () => {
            document.cookie = 'test=value'

            const result = getCookie('not_exist')

            expect(result).toBeNull()
        })
    })

    describe('eraseCookie', () => {
        it('erases cookie by setting expired date', () => {
            document.cookie = 'test_cookie=test_value; path=/'

            eraseCookie('test_cookie')

            expect(document.cookie).toContain('test_cookie=')
            expect(document.cookie).toContain('Path=/')
            expect(document.cookie).toContain('Expires=Thu, 01 Jan 1970 00:00:01 GMT')
        })

        it('can erase non-existent cookie without error', () => {
            expect(() => {
                eraseCookie('nonexistent_cookie')
            }).not.toThrow()

            expect(document.cookie).toContain('nonexistent_cookie=')
            expect(document.cookie).toContain('Expires=Thu, 01 Jan 1970 00:00:01 GMT')
        })
    })
})

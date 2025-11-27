import {mount} from '@vue/test-utils';
import {vi} from 'vitest';
import LoginModal from './LoginModal.vue';
import {authorize} from '../api/bexNote';
import {tokenStore} from '../main';

vi.mock('../api/bexNote', () => ({
    authorize: vi.fn(),
}));

const mockSubscriptionCallback = vi.fn();
vi.mock('../main', () => ({
    tokenStore: {
        token: null,
        $patch: vi.fn(),
        $subscribe: vi.fn((callback) =>
            mockSubscriptionCallback.mockImplementation(callback)
        ),
        saveToken: vi.fn()
    }
}));

describe('LoginModal.vue', () => {

    beforeEach(() => {
        authorize.mockResolvedValue({token: 'abc'})
    })

    const createWrapper = () => mount(LoginModal, {
        global: {
            stubs: {
                'prime-dialog': {
                    template: '<div class="prime-dialog-stub"><slot></slot></div>'
                },
                'prime-input': true,
                'prime-button': true
            }
        }
    })

    it('matches snapshot', async () => {
        const wrapper = await createWrapper();
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('closeCallback', () => {
        it('emits login event and hides modal when called', async () => {
            const wrapper = await createWrapper();
            const username = 'user';
            const password = 'pw';

            wrapper.vm.username = username;
            wrapper.vm.password = password;
            await wrapper.vm.closeCallback();

            expect(wrapper.emitted('login')).toBeTruthy();
            expect(wrapper.emitted('login')).toHaveLength(1);
            expect(wrapper.vm.visible).toBe(false);
            expect(authorize).toHaveBeenCalledWith(username, password);
            expect(tokenStore.saveToken).toHaveBeenCalledWith('abc');
            expect(wrapper.vm.username).toBeNull();
            expect(wrapper.vm.password).toBeNull();
        });
    });

    describe('tokenStore subscription', () => {
        test.each([
            {
                description: 'shows modal when token becomes null',
                tokenValue: null,
                expectedVisible: true
            },
            {
                description: 'does not show modal when token has value',
                tokenValue: 'some-token',
                expectedVisible: false
            }
        ])('$description', ({tokenValue, expectedVisible}) => {
            const wrapper = createWrapper();
            tokenStore.token = tokenValue;

            mockSubscriptionCallback();

            expect(wrapper.vm.visible).toBe(expectedVisible);
        });
    });
});

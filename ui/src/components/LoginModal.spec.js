import {mount} from '@vue/test-utils';
import {vi} from 'vitest';
import LoginModal from './LoginModal.vue';
import {authorize} from '../api/bexNote';
import {tokenStore} from '../main';

vi.mock('../api/bexNote', () => ({
    authorize: vi.fn().mockResolvedValue({token: 'abc'}),
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

            wrapper.vm.username = 'user';
            wrapper.vm.password = 'pass';
            await wrapper.vm.closeCallback();

            expect(wrapper.emitted('login')).toBeTruthy();
            expect(wrapper.emitted('login')).toHaveLength(1);
            expect(wrapper.vm.visible).toBe(false);
            expect(authorize).toHaveBeenCalledWith(wrapper.vm.username, wrapper.vm.password);
            expect(tokenStore.saveToken).toHaveBeenCalledWith('abc');
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

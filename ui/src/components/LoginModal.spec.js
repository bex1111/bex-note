import {mount} from '@vue/test-utils';
import {vi} from 'vitest';
import LoginModal from './LoginModal.vue';

vi.mock('../api/bexNote', () => ({
    authorize: vi.fn().mockResolvedValue({token: 'abc'})
}));

vi.mock('../main', () => ({
    tokenStore: { $patch: vi.fn() }
}));


import {authorize} from '../api/bexNote';
import {tokenStore} from '../main';

describe('LoginModal.vue', () => {

    it('matches snapshot', () => {
        const wrapper = mount(LoginModal, {
            global: {
                stubs: {
                    'prime-dialog': {
                        template: '<div class="prime-dialog-stub"><slot></slot></div>'
                    },
                    'prime-input': true,
                    'prime-button': true
                }
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('closeCallback', () => {
        it('emits login event and hides modal when called', async () => {
            const wrapper = mount(LoginModal, {
                global: {
                    stubs: {
                        'prime-dialog': true,
                        'prime-input': true,
                        'prime-button': true
                    }
                }
            });

            wrapper.vm.username = 'user';
            wrapper.vm.password = 'pass';
            await wrapper.vm.closeCallback();

            expect(wrapper.emitted('login')).toBeTruthy();
            expect(wrapper.emitted('login')).toHaveLength(1);
            expect(wrapper.vm.visible).toBe(false);
            expect(authorize).toHaveBeenCalledWith('user', 'pass');
            expect(tokenStore.$patch).toHaveBeenCalledWith({token: 'abc'});
        });
    });
});

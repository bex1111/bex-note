import {mount} from '@vue/test-utils';
import {vi} from 'vitest';
import {nextTick} from 'vue';
import TitleEditor from './TitleEditor.vue';

describe('TitleEditor.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('matches snapshot', () => {
        const wrapper = mount(TitleEditor, {
            props: {
                selectedTitle: 'test-title',
                modelValue: 'initial title'
            },
            global: {
                stubs: {
                    'prime-fluid': {
                        template: '<div class="prime-fluid-stub"><slot></slot></div>'
                    },
                    'prime-float-label': {
                        template: '<div class="prime-float-label-stub"><slot></slot></div>'
                    },
                    'prime-input': true
                }
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('watcher for selectedTitle', () => {

        const createWrapper = (props) => {
            return mount(TitleEditor, {
                props,
                global: {
                    stubs: {
                        'prime-fluid': true,
                        'prime-float-label': true,
                        'prime-input': true
                    }
                }
            });
        }

        it('updates title when selectedTitle prop changes to a non-empty value', async () => {
            const wrapper = createWrapper({
                selectedTitle: '',
                modelValue: 'initial title'
            });

            await wrapper.setProps({selectedTitle: 'new-selected-title'});
            await nextTick();

            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
            expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new-selected-title']);
        });

        it('does not update title when selectedTitle is empty', async () => {
            const wrapper = createWrapper({
                selectedTitle: 'initial-title',
                modelValue: 'initial title'
            });

            await wrapper.setProps({selectedTitle: ''});
            await nextTick();

            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });
    });
})
;

import { mount } from '@vue/test-utils';
import ActionsHeader from './ActionsHeader.vue';

describe('ActionsHeader', () => {
  it('matches snapshot', () => {
    const wrapper = mount(ActionsHeader, {
      global: {
        stubs: ['prime-toolbar', 'prime-select', 'prime-button']
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});


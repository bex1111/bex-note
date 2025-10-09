import { mount } from '@vue/test-utils';
import MarkdownEditor from './MarkdownEditor.vue';

describe('MarkdownEditor.vue', () => {
  it('renders correctly and matches snapshot', () => {
    const wrapper = mount(MarkdownEditor);
    expect(wrapper.html()).toMatchSnapshot();
  });
});


import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { nextTick } from 'vue';
import MarkdownEditor from './MarkdownEditor.vue';

vi.mock('../api/bexNote', () => ({
  getContent: vi.fn()
}));


import { getContent } from '../api/bexNote';

describe('MarkdownEditor.vue', () => {
  beforeEach(() => {
    getContent.mockResolvedValue({ content: 'mocked content' })
  });

  it('renders correctly and matches snapshot', () => {
    const wrapper = mount(MarkdownEditor, {
      props: {
        title: 'test-title',
        modelValue: 'initial content'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls getContent and updates content when title prop changes', async () => {
    const wrapper = mount(MarkdownEditor, {
      props: {
        title: '',
        modelValue: 'initial content'
      }
    });
    await wrapper.setProps({ title: 'new-title' });
    await nextTick();


    expect(getContent).toHaveBeenCalledWith('new-title');
    expect(getContent).toHaveBeenCalledTimes(1);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['mocked content']);
  });

  it('does not call getContent when title is empty', async () => {
    const wrapper = mount(MarkdownEditor, {
      props: {
        title: 'initial-title',
        modelValue: 'initial content'
      }
    });

    await wrapper.setProps({ title: '' });
    await nextTick();

    expect(getContent).not.toHaveBeenCalled();
  });
});

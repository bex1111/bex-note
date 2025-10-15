import { mount } from '@vue/test-utils';
import TitleSelector from './TitleSelector.vue';

describe('TitleSelector.vue', () => {
  it('matches snapshot', () => {
    const mockNotes = [
      { title: 'Note 1' },
      { title: 'Note 2' },
      { title: 'Folder/Nested Note' }
    ];

    const wrapper = mount(TitleSelector, {
      props: {
        notes: mockNotes,
        modelValue: ''
      },
      global: {
        stubs: {
          'prime-select': {
            template: '<div class="prime-select-stub" :options="options" :optionLabel="optionLabel" :optionValue="optionValue" :filter="filter" :placeholder="placeholder" :fluid="fluid">{{ modelValue }}</div>',
            props: ['modelValue', 'options', 'optionLabel', 'optionValue', 'filter', 'placeholder', 'fluid']
          }
        }
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});

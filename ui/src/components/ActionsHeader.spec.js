import {mount} from '@vue/test-utils';
import ActionsHeader from './ActionsHeader.vue';
import {deleteNote} from '../api/bexNote';

const createWrapper = (props) => {
    return mount(ActionsHeader, {
        props,
        global: {
            stubs: {
                'prime-toolbar': true,
                'prime-button': true
            }
        }
    });
}

describe('ActionsHeader', () => {
    it('matches snapshot', () => {
        const wrapper = mount(ActionsHeader, {
            global: {
                stubs: {
                    'prime-toolbar': {
                        template: '<div class="prime-toolbar-stub"><slot name="start"></slot><slot name="end"></slot></div>'
                    },
                    'prime-button': true
                }
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('handleDeleteNote', () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('calls deleteNote API and emits delete when selectedTitle matches title', async () => {
            vi.mock('../api/bexNote', () => ({
                deleteNote: vi.fn()
            }));
            const wrapper = createWrapper({
                selectedTitle: 'test-note',
                title: 'test-note',
                content: 'some content'
            });

            await wrapper.vm.handleDeleteNote();

            expect(deleteNote).toHaveBeenCalledWith('test-note');
            expect(wrapper.emitted('delete')).toBeTruthy();
            expect(wrapper.emitted('delete')).toHaveLength(1);
        });

        it('does not call deleteNote API when selectedTitle does not match title', async () => {
            const wrapper = createWrapper({
                selectedTitle: 'different-note',
                title: 'test-note',
                content: 'some content'
            });

            await wrapper.vm.handleDeleteNote();

            expect(deleteNote).not.toHaveBeenCalled();
            expect(wrapper.emitted('delete')).toBeFalsy();
        });
    });

    describe('handleSaveNote', () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        it('calls saveNote API and emits save when selectedTitle is not set', async () => {
            vi.mock('../api/bexNote', () => ({
                saveNote: vi.fn(),
                deleteNote: vi.fn()
            }));
            const { saveNote, deleteNote } = await import('../api/bexNote');
            const wrapper = createWrapper({
                selectedTitle: '',
                title: 'new-note',
                content: 'new content'
            });

            await wrapper.vm.handleSaveNote();

            expect(saveNote).toHaveBeenCalledWith('new-note', 'new content');
            expect(deleteNote).not.toHaveBeenCalled();
            expect(wrapper.emitted('save')).toBeTruthy();
            expect(wrapper.emitted('save')).toHaveLength(1);
        });

        it('calls deleteNote and saveNote API and emits save when selectedTitle is set', async () => {
            vi.mock('../api/bexNote', () => ({
                saveNote: vi.fn(),
                deleteNote: vi.fn()
            }));
            const { saveNote, deleteNote } = await import('../api/bexNote');
            const wrapper = createWrapper({
                selectedTitle: 'old-note',
                title: 'new-note',
                content: 'updated content'
            });

            await wrapper.vm.handleSaveNote();

            expect(deleteNote).toHaveBeenCalledWith('old-note');
            expect(saveNote).toHaveBeenCalledWith('new-note', 'updated content');
            expect(wrapper.emitted('save')).toBeTruthy();
            expect(wrapper.emitted('save')).toHaveLength(1);
        });
    });

    describe('handleCreateNew', () => {
        it('emits createNew event when called', async () => {
            const wrapper = createWrapper({
                selectedTitle: '',
                title: '',
                content: ''
            });
            await wrapper.vm.handleCreateNew();
            expect(wrapper.emitted('createNew')).toBeTruthy();
            expect(wrapper.emitted('createNew')).toHaveLength(1);
        });
    });

});

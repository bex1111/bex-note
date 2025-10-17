import {mount} from '@vue/test-utils';
import {deleteNote} from '../api/bexNote';
import ActionsHeader from './ActionsHeader.vue';
import {notificationStore} from '../main'

vi.mock('../main', () => ({
    notificationStore: {
        $patch: vi.fn()
    }
}));

const directives = {
    tooltip: {}
};

const createWrapper = (props) => {
    return mount(ActionsHeader, {
        props,
        global: {
            stubs: {
                'prime-toolbar': true,
                'prime-button': true
            },
            directives
        }
    });
}

describe('ActionsHeader.vue', () => {
    const testNote = 'test-note';

    it('matches snapshot', () => {
        const wrapper = mount(ActionsHeader, {
            global: {
                stubs: {
                    'prime-toolbar': {
                        template: '<div class="prime-toolbar-stub"><slot name="start"></slot><slot name="end"></slot></div>'
                    },
                    'prime-button': true
                },
                directives
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
                selectedTitle: testNote,
                title: testNote,
                content: 'some content'
            });

            await wrapper.vm.handleDeleteNote();

            expect(deleteNote).toHaveBeenCalledWith(testNote);
            expect(wrapper.emitted('delete')).toBeTruthy();
            expect(wrapper.emitted('delete')).toHaveLength(1);
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'warn',
                message: `"${testNote}" deleted successfully.`
            });
        });

        it('does not call deleteNote API when selectedTitle does not match title', async () => {
            const wrapper = createWrapper({
                selectedTitle: 'different-note',
                title: testNote,
                content: 'some content'
            });

            await wrapper.vm.handleDeleteNote();

            expect(deleteNote).not.toHaveBeenCalled();
            expect(wrapper.emitted('delete')).toBeFalsy();
            expect(notificationStore.$patch).not.toHaveBeenCalled();
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
            const {saveNote, deleteNote} = await import('../api/bexNote');
            const wrapper = createWrapper({
                selectedTitle: '',
                title: testNote,
                content: 'new content'
            });

            await wrapper.vm.handleSaveNote();

            expect(saveNote).toHaveBeenCalledWith(testNote, 'new content');
            expect(deleteNote).not.toHaveBeenCalled();
            expect(wrapper.emitted('save')).toBeTruthy();
            expect(wrapper.emitted('save')).toHaveLength(1);
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'success',
                message: `"${testNote}" saved successfully.`
            });
        });

        it('calls deleteNote and saveNote API and emits save when selectedTitle is set', async () => {
            vi.mock('../api/bexNote', () => ({
                saveNote: vi.fn(),
                deleteNote: vi.fn()
            }));
            const {saveNote, deleteNote} = await import('../api/bexNote');
            const wrapper = createWrapper({
                selectedTitle: 'old-note',
                title: testNote,
                content: 'updated content'
            });

            await wrapper.vm.handleSaveNote();

            expect(deleteNote).toHaveBeenCalledWith('old-note');
            expect(saveNote).toHaveBeenCalledWith(testNote, 'updated content');
            expect(wrapper.emitted('save')).toBeTruthy();
            expect(wrapper.emitted('save')).toHaveLength(1);
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'success',
                message: `"${testNote}" saved successfully.`
            });
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

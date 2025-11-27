import {mount} from '@vue/test-utils';
import ActionsHeader from './ActionsHeader.vue';
import {notificationStore, tokenStore} from '../main'
import {deleteNote, logout, saveNote} from '../api/bexNote';

vi.mock('../main', () => ({
    notificationStore: {
        $patch: vi.fn()
    },
    tokenStore: {
        resetToken: vi.fn()
    }
}));
vi.mock('../api/bexNote', () => ({
    saveNote: vi.fn(),
    deleteNote: vi.fn(),
    logout: vi.fn(),
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
        it('calls deleteNote API and emits delete when selectedTitle matches title', async () => {
            const wrapper = createWrapper({
                selectedTitle: testNote,
                title: testNote,
                content: 'some content'
            });

            await wrapper.vm.handleDeleteNote();

            expect(wrapper.emitted('delete')).toBeTruthy();
            expect(wrapper.emitted('delete')).toHaveLength(1);
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'warn',
                message: `"${testNote}" deleted successfully.`
            });
            expect(deleteNote).toHaveBeenCalledWith(testNote);
        });

        it('does not call deleteNote API when selectedTitle does not match title', async () => {
            const wrapper = createWrapper({
                selectedTitle: 'different-note',
                title: testNote,
                content: 'some content'
            });

            await wrapper.vm.handleDeleteNote();

            expect(wrapper.emitted('delete')).toBeFalsy();
            expect(notificationStore.$patch).not.toHaveBeenCalled();
            expect(deleteNote).not.toHaveBeenCalled();
        });
    });

    describe('handleSaveNote', () => {
        it('calls saveNote API and emits save when selectedTitle is not set', async () => {
            const wrapper = createWrapper({
                selectedTitle: '',
                title: testNote,
                content: 'new content'
            });

            await wrapper.vm.handleSaveNote();

            expect(wrapper.emitted('save')).toBeTruthy();
            expect(wrapper.emitted('save')).toHaveLength(1);
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'success',
                message: `"${testNote}" saved successfully.`
            });
            expect(saveNote).toHaveBeenCalledWith(testNote, 'new content');
            expect(deleteNote).not.toHaveBeenCalled();
        });

        it('calls deleteNote and saveNote API and emits save when selectedTitle is set', async () => {
            const wrapper = createWrapper({
                selectedTitle: 'old-note',
                title: testNote,
                content: 'updated content'
            });

            await wrapper.vm.handleSaveNote();

            expect(wrapper.emitted('save')).toBeTruthy();
            expect(wrapper.emitted('save')).toHaveLength(1);
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'success',
                message: `"${testNote}" saved successfully.`
            });
            expect(saveNote).toHaveBeenCalledWith(testNote, 'updated content');
            expect(deleteNote).toHaveBeenCalledWith('old-note');
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

    describe('handleLogout', () => {

        it('calls logout API and patches notification store with success message', async () => {
            const wrapper = createWrapper({
                selectedTitle: '',
                title: '',
                content: ''
            });

            await wrapper.vm.handleLogout();

            expect(logout).toHaveBeenCalled();
            expect(tokenStore.resetToken).toHaveBeenCalled();
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'success',
                message: 'Logout successful.'
            });
        });
    });

});

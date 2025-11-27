import {mount} from '@vue/test-utils';
import {vi} from 'vitest';
import App from './App.vue';
import {getNoteList} from './api/bexNote';

vi.mock('./api/bexNote', () => ({
    getNoteList: vi.fn()
}));

describe('App.vue', () => {
    const createWrapper = () => {
        return mount(App, {
            global: {
                stubs: {
                    'prime-card': {
                        template: `<div class="prime-card-stub">
                <div class="card-title"><slot name="title"></slot></div>
                <div class="card-subtitle"><slot name="subtitle"></slot></div>
                <div class="card-content"><slot name="content"></slot></div>
              </div>`
                    },
                    'ActionsHeader': {
                        template: '<div class="actions-header-stub" data-testid="actions-header"></div>',
                        props: ['selectedTitle', 'title', 'content'],
                        emits: ['createNew', 'save', 'delete']
                    },
                    'TitleSelector': {
                        template: '<div class="title-selector-stub" data-testid="title-selector"></div>',
                        props: ['modelValue', 'notes'],
                        emits: ['update:modelValue']
                    },
                    'TitleEditor': {
                        template: '<div class="title-editor-stub" data-testid="title-editor"></div>',
                        props: ['modelValue', 'selectedTitle'],
                        emits: ['update:modelValue']
                    },
                    'MarkdownEditor': {
                        template: '<div class="markdown-editor-stub" data-testid="markdown-editor"></div>',
                        props: ['modelValue', 'title'],
                        emits: ['update:modelValue']
                    },
                    'LoginModal': {
                        template: '<div class="login-modal-stub" data-testid="login-modal"></div>',
                        emits: ['login']
                    },
                    'Notification': {
                        template: '<div class="notifictation-modal-stub" data-testid="notification"></div>'
                    },
                    'Loader': {
                        template: '<div class="loader-stub" data-testid="loader"></div>'
                    }
                }
            }
        });
    }
    const testTitle = 'Test Title';

    it('matches snapshot', () => {
        const wrapper = createWrapper()

        expect(wrapper.html()).toMatchSnapshot();
    });

    describe('onMounted', () => {
        it('calls refreshNotes on component mount', async () => {
            const mockNotes = [
                {title: 'Note 1'},
                {title: 'Note 2'}
            ];
            getNoteList.mockResolvedValue(mockNotes);

            const wrapper = createWrapper();

            await wrapper.vm.$nextTick();

            expect(getNoteList).toHaveBeenCalledTimes(1);
            expect(wrapper.vm.notes).toEqual(mockNotes);
        });
    });

    describe('createNew', () => {

        it('resets all form values to null when called', async () => {
            const wrapper = createWrapper()

            wrapper.vm.title = testTitle;
            wrapper.vm.selectedTitle = 'Selected Title';
            wrapper.vm.content = 'Test Content';

            expect(wrapper.vm.title).toBe(testTitle);
            expect(wrapper.vm.selectedTitle).toBe('Selected Title');
            expect(wrapper.vm.content).toBe('Test Content');

            await wrapper.vm.createNew();

            expect(wrapper.vm.title).toBeNull();
            expect(wrapper.vm.selectedTitle).toBeNull();
            expect(wrapper.vm.content).toBeNull();
        });
    });

    describe('refreshNotes', () => {
        const mockNotes = [
            {title: 'Note 1'},
            {title: 'Note 2'},
            {title: testTitle}
        ];

        beforeEach(() => {
            getNoteList.mockResolvedValue(mockNotes);
        });

        it('sets selectedTitle to title when title exists in notes', async () => {
            const wrapper = createWrapper();
            wrapper.vm.title = testTitle;
            wrapper.vm.selectedTitle = testTitle + '1';

            await wrapper.vm.handleRefresh();

            expect(wrapper.vm.selectedTitle).toBe(testTitle);
            expect(wrapper.vm.title).toBe(testTitle);
            expect(wrapper.vm.notes).toEqual(mockNotes);
        });

        it('resets selectedTitle and title when delete notes', async () => {
            const wrapper = createWrapper();
            wrapper.vm.title = 'Non-existent Title';
            wrapper.vm.selectedTitle = testTitle;
            wrapper.vm.content = 'Some content';

            await wrapper.vm.handleRefresh();

            expect(wrapper.vm.selectedTitle).toBeNull();
            expect(wrapper.vm.title).toBeNull();
            expect(wrapper.vm.content).toBeNull();
            expect(wrapper.vm.notes).toEqual(mockNotes);
        });

        it('not resets title when save notes the first time', async () => {
            const wrapper = createWrapper();
            wrapper.vm.title = testTitle;
            wrapper.vm.selectedTitle = null;

            await wrapper.vm.handleRefresh();

            expect(wrapper.vm.selectedTitle).toEqual(testTitle);
            expect(wrapper.vm.title).toEqual(testTitle);
            expect(wrapper.vm.notes).toEqual(mockNotes);
        });

    });
});

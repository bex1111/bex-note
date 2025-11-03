import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {authorize, deleteNote, getContent, getNoteList, saveNote} from './bexNote';


vi.mock('../main', () => ({
    tokenStore: {
        token: 'test-token-123',
        resetToken: vi.fn()
    },
    notificationStore: {
        $patch: vi.fn()
    },
    loadStore: {
        $patch: vi.fn()
    }
}));

import {loadStore, notificationStore, tokenStore} from '../main';

describe('bex-note API integration tests', () => {
    let mock = new MockAdapter(axios);
    const errorResponse = {error: 'Test error message'};
    const expectedNotification = {
        type: 'error',
        message: 'Test error message'
    };

    beforeEach(() => {
        mock = new MockAdapter(axios);
        vi.clearAllMocks();
    });

    afterEach(() => {
        expect(loadStore.$patch).toHaveBeenCalledTimes(2);
        expect(loadStore.$patch).toHaveBeenNthCalledWith(1, {loading: true});
        expect(loadStore.$patch).toHaveBeenNthCalledWith(2, {loading: false});

    });

    describe('getNoteList', () => {
        test('makes correct API call', async () => {
            const mockData = [{title: 'Test Note', content: 'Test Content'}];
            mock.onGet('/api/internal/note/list').reply(200, mockData);

            const result = await getNoteList();

            expect(mock.history.get).toHaveLength(1);
            expect(mock.history.get[0].url).toBe('/api/internal/note/list');
            expect(mock.history.get[0].headers['x-auth-token']).toBe('test-token-123');
            expect(result).toEqual(mockData);
        });

        test('handles API errors correctly', async () => {
            mock.onGet('/api/internal/note/list').reply(400, errorResponse);

            await expect(getNoteList()).rejects.toThrow();

            expect(mock.history.get).toHaveLength(1);
            expect(mock.history.get[0].url).toBe('/api/internal/note/list');
            expect(notificationStore.$patch).toHaveBeenCalledWith(expectedNotification);
        });

        test('resets token on 403 error', async () => {
            const forbiddenError = {error: 'Forbidden'};
            mock.onGet('/api/internal/note/list').reply(403, forbiddenError);

            await expect(getNoteList()).rejects.toThrow();

            expect(tokenStore.resetToken).toHaveBeenCalled();
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'error',
                message: 'Forbidden'
            });
        });
    });

    describe('authorize', () => {
        test('makes correct API call', async () => {
            const mockResponse = {token: 'new-token'};
            mock.onPost('/api/authorize').reply(200, mockResponse);

            const result = await authorize('testuser', 'testpass');

            expect(mock.history.post).toHaveLength(1);
            expect(mock.history.post[0].url).toBe('/api/authorize');
            expect(JSON.parse(mock.history.post[0].data)).toEqual({
                username: 'testuser',
                password: 'testpass'
            });
            expect(result).toEqual(mockResponse);
        });

        test('handles API errors correctly', async () => {
            mock.onPost('/api/authorize').reply(400, errorResponse);

            await expect(authorize('wronguser', 'wrongpass')).rejects.toThrow();

            expect(mock.history.post).toHaveLength(1);
            expect(mock.history.post[0].url).toBe('/api/authorize');
            expect(notificationStore.$patch).toHaveBeenCalledWith(expectedNotification);
        });

        test('resets token on 403 error', async () => {
            const forbiddenError = {error: 'Forbidden'};
            mock.onPost('/api/authorize').reply(403, forbiddenError);

            await expect(authorize('testuser', 'testpass')).rejects.toThrow();

            expect(tokenStore.resetToken).toHaveBeenCalled();
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'error',
                message: 'Forbidden'
            });
        });
    });

    describe('deleteNote', () => {
        test('makes correct API call', async () => {
            mock.onDelete('/api/internal/note/delete').reply(200);

            await deleteNote('Test Note');

            expect(mock.history.delete).toHaveLength(1);
            expect(mock.history.delete[0].url).toBe('/api/internal/note/delete');
            expect(mock.history.delete[0].headers['x-auth-token']).toBe('test-token-123');
            expect(JSON.parse(mock.history.delete[0].data)).toEqual({title: 'Test Note'});
        });

        test('throws error on API failure', async () => {
            mock.onDelete('/api/internal/note/delete').reply(400, errorResponse);

            await expect(deleteNote('Nonexistent Note')).rejects.toThrow();

            expect(mock.history.delete).toHaveLength(1);
            expect(mock.history.delete[0].url).toBe('/api/internal/note/delete');
            expect(mock.history.delete[0].headers['x-auth-token']).toBe('test-token-123');
            expect(notificationStore.$patch).toHaveBeenCalledWith(expectedNotification);
        });

        test('resets token on 403 error', async () => {
            const forbiddenError = {error: 'Forbidden'};
            mock.onDelete('/api/internal/note/delete').reply(403, forbiddenError);

            await expect(deleteNote('Test Note')).rejects.toThrow();

            expect(tokenStore.resetToken).toHaveBeenCalled();
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'error',
                message: 'Forbidden'
            });
        });
    });

    describe('saveNote', () => {
        test('makes correct API call', async () => {
            mock.onPost('/api/internal/note/save').reply(200);

            await saveNote('Test Note', 'Test Content');

            expect(mock.history.post).toHaveLength(1);
            expect(mock.history.post[0].url).toBe('/api/internal/note/save');
            expect(mock.history.post[0].headers['x-auth-token']).toBe('test-token-123');
            expect(JSON.parse(mock.history.post[0].data)).toEqual(
                {title: 'Test Note', content: 'Test Content'}
            );
        });

        test('throws error on API failure', async () => {
            mock.onPost('/api/internal/note/save').reply(400, errorResponse);

            await expect(saveNote('', 'Test Content')).rejects.toThrow();

            expect(mock.history.post).toHaveLength(1);
            expect(mock.history.post[0].url).toBe('/api/internal/note/save');
            expect(mock.history.post[0].headers['x-auth-token']).toBe('test-token-123');
            expect(notificationStore.$patch).toHaveBeenCalledWith(expectedNotification);
        });

        test('resets token on 403 error', async () => {
            const forbiddenError = {error: 'Forbidden'};
            mock.onPost('/api/internal/note/save').reply(403, forbiddenError);

            await expect(saveNote('Test Note', 'Test Content')).rejects.toThrow();

            expect(tokenStore.resetToken).toHaveBeenCalled();
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'error',
                message: 'Forbidden'
            });
        });
    });

    describe('getContent', () => {
        test('makes correct API call', async () => {
            const mockResponse = {content: 'Test Content'};
            mock.onPost('/api/internal/note/content').reply(200, mockResponse);

            const result = await getContent('Test Note');

            expect(mock.history.post).toHaveLength(1);
            expect(mock.history.post[0].url).toBe('/api/internal/note/content');
            expect(mock.history.post[0].headers['x-auth-token']).toBe('test-token-123');
            expect(JSON.parse(mock.history.post[0].data)).toEqual(
                {title: 'Test Note'}
            );
            expect(result).toEqual(mockResponse);
        });

        test('throws error on API failure', async () => {
            mock.onPost('/api/internal/note/content').reply(400, errorResponse);

            await expect(getContent('Nonexistent Note')).rejects.toThrow();

            expect(mock.history.post).toHaveLength(1);
            expect(mock.history.post[0].url).toBe('/api/internal/note/content');
            expect(mock.history.post[0].headers['x-auth-token']).toBe('test-token-123');
            expect(notificationStore.$patch).toHaveBeenCalledWith(expectedNotification);
        });

        test('resets token on 403 error', async () => {
            const forbiddenError = {error: 'Forbidden'};
            mock.onPost('/api/internal/note/content').reply(403, forbiddenError);

            await expect(getContent('Test Note')).rejects.toThrow();

            expect(tokenStore.resetToken).toHaveBeenCalled();
            expect(notificationStore.$patch).toHaveBeenCalledWith({
                type: 'error',
                message: 'Forbidden'
            });
        });
    });
});

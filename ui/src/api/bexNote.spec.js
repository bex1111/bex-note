import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getNoteList, authorize, deleteNote, saveNote, getContent } from './bexNote';

vi.mock('../main', () => ({
    tokenStore: {
        token: 'test-token-123'
    }
}));

describe('bex-note API integration tests', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    test('getNoteList makes correct API call', async () => {
        const mockData = [{ title: 'Test Note', content: 'Test Content' }];
        mock.onGet('/api/internal/note/list').reply(200, mockData);

        const result = await getNoteList();

        expect(mock.history.get).toHaveLength(1);
        expect(mock.history.get[0].url).toBe('/api/internal/note/list');
        expect(mock.history.get[0].headers['x-auth-token']).toBe('test-token-123');
        expect(result).toEqual(mockData);
    });

    test('authorize makes correct API call', async () => {
        const mockResponse = { token: 'new-token' };
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

    test('deleteNote makes correct API call', async () => {
        const mockResponse = { success: true };
        mock.onDelete('/api/internal/note/delete').reply(200, mockResponse);

        const result = await deleteNote('Test Note');

        expect(mock.history.delete).toHaveLength(1);
        expect(mock.history.delete[0].url).toBe('/api/internal/note/delete');
        expect(mock.history.delete[0].headers['x-auth-token']).toBe('test-token-123');
        expect(JSON.parse(mock.history.delete[0].data)).toEqual({ title: 'Test Note' });
        expect(result).toEqual(mockResponse);
    });

    test('saveNote makes correct API call', async () => {
        const mockResponse = { success: true };
        mock.onPost('/api/internal/note/save').reply(200, mockResponse);

        const result = await saveNote('Test Note', 'Test Content');

        expect(mock.history.post).toHaveLength(1);
        expect(mock.history.post[0].url).toBe('/api/internal/note/save');
        expect(mock.history.post[0].headers['x-auth-token']).toBe('test-token-123');
        expect(JSON.parse(mock.history.post[0].data)).toEqual(
             { title: 'Test Note', content: 'Test Content' }
        );
        expect(result).toEqual(mockResponse);
    });

    test('getContent makes correct API call', async () => {
        const mockResponse = { content: 'Test Content' };
        mock.onPost('/api/internal/note/content').reply(200, mockResponse);

        const result = await getContent('Test Note');

        expect(mock.history.post).toHaveLength(1);
        expect(mock.history.post[0].url).toBe('/api/internal/note/content');
        expect(mock.history.post[0].headers['x-auth-token']).toBe('test-token-123');
        expect(JSON.parse(mock.history.post[0].data)).toEqual(
             { title: 'Test Note' }
        );
        expect(result).toEqual(mockResponse);
    });
});

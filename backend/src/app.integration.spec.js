const request = require('supertest');
const OLD_ENV = process.env;
process.env.NODE_ENV = 'test';
process.env.USERNAME = 'testuser';
process.env.PASSWORD = 'testpass';
process.env.FOLDER = './temp/inttestnotes';
process.env.STATIC_FOLDER_FOR_WEB = './temp/teststatic';

const app = require('./app');

describe('API Integration Tests', () => {

    afterAll(() => {
        process.env = OLD_ENV;
    });

    describe('Invalid token', () => {


        it('/api/authorize should return 403 for invalid user data', async () => {
            const response = await request(app)
                .post('/api/authorize')
                .send({
                    username: 'wronguser',
                    password: 'wrong'
                })
                .expect(403);

            expect(response.body).toEqual({
                error: 'Unauthorized'
            });
        });

        it('/api/internal/note/save should return 403 with invalid token', async () => {
            const noteData = {
                title: 'Test Note',
                content: '# Test Content\nThis is a test note.'
            };

            const response = await request(app)
                .post('/api/internal/note/save')
                .set('x-auth-token', 'invalid-token-123')
                .send(noteData)
                .expect(403);

            expect(response.body).toHaveProperty('error');
        });

        it('/api/internal/note/delete should return 403 with invalid token', async () => {
            const noteData = {
                title: 'Test Note to Delete'
            };

            const response = await request(app)
                .delete('/api/internal/note/delete')
                .set('x-auth-token', 'invalid-token-123')
                .send(noteData)
                .expect(403);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('Valid token', () => {

        it('should save a note successfully with valid token', async () => {
            const authResponse = await request(app)
                .post('/api/authorize')
                .send({
                    username: 'testuser',
                    password: 'testpass'
                })
                .expect(200);

            let validToken = authResponse.body.token;

            for (let i = 0; i < 5; i++) {
                const noteData = {
                    title: `Test Note ${i}`,
                    content: `# Test Content ${i}`
                };
                await request(app)
                    .post('/api/internal/note/save')
                    .set('x-auth-token', validToken)
                    .send(noteData)
                    .expect(200);

            }

           await request(app)
                .delete('/api/internal/note/delete')
                .set('x-auth-token', validToken)
                .send({title: 'Test Note 2'})
                .expect(200);

            const listResponse = await request(app)
                .get('/api/internal/note/list')
                .set('x-auth-token', validToken)
                .expect(200);

            expect(listResponse.body).toEqual([
                {
                    "title": "Test Note 0"
                },
                {
                    "title": "Test Note 1"
                },
                {
                    "title": "Test Note 3"
                },
                {
                    "title": "Test Note 4"
                }
            ]);

            const contentResponse = await request(app)
                .post('/api/internal/note/content')
                .set('x-auth-token', validToken)
                .send({title: 'Test Note 3'})
                .expect(200);
            expect(contentResponse.body).toEqual( {"content": "# Test Content 3"})
        });
    });

    describe('Healthcheck', () => {
        it('/api/healthcheck should return 200', async () => {
            await request(app)
                .get('/api/healthcheck')
                .send()
                .expect(200);
        });
    })

});

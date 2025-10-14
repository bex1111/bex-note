const {
    getSavingLocationEnv,
    getStaticFileForWebEnv,
    getUsernameEnv,
    getUserPasswordEnv,
    validateAllEnvSet
} = require('./environmentProvider');

describe('environmentProvider', () => {
    const OLD_ENV = process.env;



    afterAll(() => {
        process.env = OLD_ENV;
    });

    describe('getSavingLocationEnv', () => {
        test('returns FOLDER env var when set', () => {
            process.env.FOLDER = '/tmp/saving';
            expect(getSavingLocationEnv()).toBe('/tmp/saving');
        });
        test('returns empty string when FOLDER env var is not set', () => {
            delete process.env.FOLDER;
            expect(getSavingLocationEnv()).toBeUndefined();
        });
    });

    describe('getStaticFileForWebEnv', () => {
        test('returns STATIC_FOLDER_FOR_WEB env var when set', () => {
            process.env.STATIC_FOLDER_FOR_WEB = '/tmp/static';
            expect(getStaticFileForWebEnv()).toBe('/tmp/static');
        });
        test('returns empty string when STATIC_FOLDER_FOR_WEB env var is not set', () => {
            delete process.env.STATIC_FOLDER_FOR_WEB;
            expect(getStaticFileForWebEnv()).toBeUndefined();
        });
    });

    describe('getUsernameEnv', () => {
        test('returns USERNAME env var when set', () => {
            process.env.USERNAME = 'testuser';
            expect(getUsernameEnv()).toBe('testuser');
        });
        test('returns empty string when USERNAME env var is not set', () => {
            delete process.env.USERNAME;
            expect(getUsernameEnv()).toBeUndefined();
        });
    });

    describe('getUserPasswordEnv', () => {
        test('returns PASSWORD env var when set', () => {
            process.env.PASSWORD = 'secret';
            expect(getUserPasswordEnv()).toBe('secret');
        });
        test('returns empty string when PASSWORD env var is not set', () => {
            delete process.env.PASSWORD;
            expect(getUserPasswordEnv()).toBeUndefined();
        });
    });

    describe('validateAllEnvSet', () => {
        let consoleErrorSpy;
        beforeEach(() => {
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        });

        test('does not log error when all env vars are set', () => {
            process.env.FOLDER = '/tmp/saving';
            process.env.STATIC_FOLDER_FOR_WEB = '/tmp/static';
            process.env.USERNAME = 'testuser';
            process.env.PASSWORD = 'secret';
            validateAllEnvSet();
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });

        test('logs error for each missing env var', () => {
            delete process.env.FOLDER;
            delete process.env.STATIC_FOLDER_FOR_WEB;
            delete process.env.USERNAME;
            delete process.env.PASSWORD;
            validateAllEnvSet();
            expect(consoleErrorSpy).toHaveBeenCalledTimes(4);
            expect(consoleErrorSpy).toHaveBeenCalledWith("Not all required environment variables are set.");
        });
    });
});

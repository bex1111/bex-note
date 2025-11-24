const {
    getSavingLocation,
    getStaticFileForWeb,
    getUsername,
    getUserPassword,
    getPort, getMaxFileSize
} = require('./configProvider');


describe('configProvider', () => {
    const OLD_ENV = process.env;
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    });

    beforeEach(() => {
        consoleErrorSpy.mockReset();
        process.env = OLD_ENV
    });

    describe('getSavingLocation', () => {
        test('returns FOLDER env var when set', () => {
            process.env.FOLDER = '/tmp/saving';
            expect(getSavingLocation()).toBe('/tmp/saving');
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });
        test('returns undefined and logs error when FOLDER env var is not set', () => {
            delete process.env.FOLDER;
            expect(getSavingLocation()).toBeUndefined();
            expect(consoleErrorSpy).toHaveBeenCalledWith("FOLDER environment variable is not set.");
        });
    });

    describe('getStaticFileForWeb', () => {
        test('returns STATIC_FOLDER_FOR_WEB env var when set', () => {
            process.env.STATIC_FOLDER_FOR_WEB = '/tmp/static';
            expect(getStaticFileForWeb()).toBe('/tmp/static');
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });
        test('returns undefined and logs error when STATIC_FOLDER_FOR_WEB env var is not set', () => {
            delete process.env.STATIC_FOLDER_FOR_WEB;
            expect(getStaticFileForWeb()).toBeUndefined();
            expect(consoleErrorSpy).toHaveBeenCalledWith("STATIC_FOLDER_FOR_WEB environment variable is not set.");
        });
    });

    describe('getUsername', () => {
        test('returns USERNAME env var when set', () => {
            process.env.USERNAME = 'testuser';
            expect(getUsername()).toBe('testuser');
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });
        test('returns undefined and logs error when USERNAME env var is not set', () => {
            delete process.env.USERNAME;
            expect(getUsername()).toBeUndefined();
            expect(consoleErrorSpy).toHaveBeenCalledWith("USERNAME environment variable is not set.");
        });
    });

    describe('getUserPassword', () => {
        test('returns PASSWORD env var when set', () => {
            process.env.PASSWORD = 'secret';
            expect(getUserPassword()).toBe('secret');
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });
        test('returns undefined and logs error when USER_PASSWORD env var is not set', () => {
            delete process.env.PASSWORD;
            expect(getUserPassword()).toBeUndefined();
            expect(consoleErrorSpy).toHaveBeenCalledWith("PASSWORD environment variable is not set.");
        });
    });

    describe('getPort', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
        });

        beforeEach(() => {
            consoleLogSpy.mockReset();
        });

        test('returns PORT env var when set', () => {
            process.env.PORT = '8080';
            expect(getPort()).toBe('8080');
            expect(consoleLogSpy).not.toHaveBeenCalled();
        });

        test('returns 3000 and logs message when PORT env var is not set', () => {
            delete process.env.PORT;
            expect(getPort()).toBe(3000);
            expect(consoleLogSpy).toHaveBeenCalledWith('PORT environment variable is not set. Use default 3000.');
        });
    });

    describe('getMaxFileSize', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
        });

        beforeEach(() => {
            consoleLogSpy.mockReset();
        });

        test('returns MAX_FILE_SIZE_IN_MB env var when set as number', () => {
            process.env.MAX_FILE_SIZE_IN_MB = 10;
            expect(getMaxFileSize()).toBe('10mb');
            expect(consoleLogSpy).not.toHaveBeenCalled();
        });

        test('returns MAX_FILE_SIZE_IN_MB env var when set as string number', () => {
            process.env.MAX_FILE_SIZE_IN_MB = '10';
            expect(getMaxFileSize()).toBe('10mb');
            expect(consoleLogSpy).not.toHaveBeenCalled();
        });

        test('returns 50mb and logs message when MAX_FILE_SIZE_IN_MB env var is not set', () => {
            delete process.env.MAX_FILE_SIZE_IN_MB;
            expect(getMaxFileSize()).toBe('64mb');
            expect(consoleLogSpy).toHaveBeenCalledWith('MAX_FILE_SIZE_IN_MB environment variable is not set. Use default 50.');
        });

        test('returns 50mb and logs message when MAX_FILE_SIZE_IN_MB env var is string', () => {
            process.env.MAX_FILE_SIZE_IN_MB = 'wrong';
            expect(getMaxFileSize()).toBe('64mb');
            expect(consoleLogSpy).toHaveBeenCalledWith('MAX_FILE_SIZE_IN_MB environment variable is not set. Use default 50.');
        });
    });
});

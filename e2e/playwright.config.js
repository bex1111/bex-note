import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: 1,
    reporter: 'list',
    use: {
        baseURL: 'http://bex-note:5001',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
            testMatch: /.*\.spec\.js/
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
            testMatch: /.*\.spec\.js/
        },
    ],
});

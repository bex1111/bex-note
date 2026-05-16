const TEST_USERNAME = 'test';
const TEST_PASSWORD = 'test';

export async function login (page) {
    await page.getByLabel('Username').fill(TEST_USERNAME);
    await page.getByLabel('Password').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: 'Sign-In' }).click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });
}

export async function isLoggedIn (page) {
    return await page.locator('.p-dialog').isHidden();
}

export async function logout (page) {
    await page.locator('[data-test-id="logout"]').click();
    await page.locator('.p-toast')
        .getByText('Logout successful.')
        .waitFor({ state: 'visible' });
}

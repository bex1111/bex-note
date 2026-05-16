import { expect, test } from '@playwright/test';
import { login, logout } from './helpers/auth.js';

const saveNoteButton = (page) => page.locator('[data-test-id="save-note"]');
const newNoteButton = (page) => page.locator('[data-test-id="new-note"]');
const titleInput = (page) => page.locator('[data-test-id="title-input"]');
const markdownEditor = (page) => page.locator('[data-test-id="markdown-editor"] .cm-content');
const toast = (page) => page.locator('.p-toast');
const titleSelector = (page) => page.locator('[data-test-id="title-selector"]');
const deleteNoteButton = (page) => page.locator('[data-test-id="delete-note"]');
const noteOption = (page, title) => page.getByRole('option', { name: title, exact: true });

async function saveNote (page) {
    await saveNoteButton(page).click();
    await expect(toast(page).getByText('saved successfully.')).toBeVisible();
}

async function createNote (page, title, content) {
    await newNoteButton(page).click();
    await titleInput(page).fill(title);
    await markdownEditor(page).fill(content);
    await saveNote(page);
}

async function selectNote (page, title) {
    await titleSelector(page).click();
    await noteOption(page, title).click();
}

async function deleteCurrentNote (page) {
    await deleteNoteButton(page).click();
    await expect(toast(page)).toBeVisible();
}

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await login(page);
});

test.afterEach(async ({ page }) => {
    await logout(page);
});

test('create a note - appears in title selector', async ({ page }) => {
    const title = `e2e-create-${Date.now()}`;
    await createNote(page, title, '# Hello');

    await titleSelector(page).click();
    await expect(noteOption(page, title)).toBeVisible();

    await noteOption(page, title).click();
    await deleteCurrentNote(page);
});

test('edit note content - persists after reload', async ({ page }) => {
    const title = `e2e-edit-${Date.now()}`;
    await createNote(page, title, '# Original');

    await selectNote(page, title);
    await markdownEditor(page).fill('# Updated content');
    await saveNote(page);

    await selectNote(page, title);
    await expect(markdownEditor(page)).toContainText('Updated content');

    await deleteCurrentNote(page);
});

test('rename a note - new title appears in selector', async ({ page }) => {
    const title = `e2e-rename-${Date.now()}`;
    const newTitle = `${title}-renamed`;
    await createNote(page, title, '# Rename test');

    await selectNote(page, title);
    await titleInput(page).fill(newTitle);
    await saveNote(page);

    await titleSelector(page).click();
    await expect(noteOption(page, newTitle)).toBeVisible();
    await expect(noteOption(page, title)).not.toBeVisible();

    await noteOption(page, newTitle).click();
    await deleteCurrentNote(page);
});

test('delete a note - removed from title selector', async ({ page }) => {
    const title = `e2e-delete-${Date.now()}`;
    await createNote(page, title, '# Delete test');

    await selectNote(page, title);
    await deleteCurrentNote(page);

    await titleSelector(page).click();
    await expect(noteOption(page, title)).not.toBeVisible();
});

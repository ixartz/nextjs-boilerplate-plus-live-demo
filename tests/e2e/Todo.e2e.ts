import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { createUser } from '../TestUtils';

test.describe('Todo', () => {
  test.beforeEach(async ({ page }) => {
    await createUser(page);
  });

  test.describe('Basic CRUD operations', () => {
    test('should create and edit a todo', async ({ page }) => {
      await page.getByRole('link', { name: 'Todos' }).click();

      // Check if there are no todos
      await expect(page.getByText('No results found')).toBeVisible();

      // Create a new todo
      await page.getByRole('link', { name: 'New todo' }).click();

      const title = faker.word.words(3);
      await page.getByLabel('Title').fill(title);
      await page.getByLabel('Message').fill(faker.word.words(10));
      await page.getByRole('button', { name: 'Create todo' }).click();

      const createdRow = page.getByRole('row').filter({ hasText: title });

      await expect(createdRow).toBeVisible();

      // Edit the todo
      await createdRow.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('menuitem', { name: 'Edit' }).click();

      const editedTitle = `[EDITED] ${faker.word.words(3)}`;
      await page.getByLabel('Title').fill(editedTitle);
      await page.getByRole('button', { name: 'Save changes' }).click();

      await expect(page.getByRole('row').filter({ hasText: editedTitle })).toBeVisible();
    });

    test('should create and delete a todo', async ({ page }) => {
      await page.getByRole('link', { name: 'Todos' }).click();

      // Check if there are no todos
      await expect(page.getByText('No results found')).toBeVisible();

      // Create a new todo
      await page.getByRole('link', { name: 'New todo' }).click();

      const title = faker.word.words(3);
      await page.getByLabel('Title').fill(title);
      await page.getByLabel('Message').fill(faker.word.words(10));
      await page.getByRole('button', { name: 'Create todo' }).click();

      const createdRow = page.getByRole('row').filter({ hasText: title });

      await expect(createdRow).toBeVisible();

      // Delete the todo
      await createdRow.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('menuitem', { name: 'Delete' }).click();

      await expect(createdRow).toBeHidden();
      await expect(page.getByText('No results found')).toBeVisible();
    });
  });
});

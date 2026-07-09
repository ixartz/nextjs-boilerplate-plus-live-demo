import { test as setup } from '@playwright/test';
import { createUser } from './TestUtils';

setup('Create a new user', async ({ page }) => {
  const { email, password } = await createUser(page);

  process.env.E2E_AUTH_USER_USERNAME = email;
  process.env.E2E_AUTH_USER_PASSWORD = password;
});

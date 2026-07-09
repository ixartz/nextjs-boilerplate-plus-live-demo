import type { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

export const createUser = async (page: Page) => {
  // Generate unique test email with +test@ format for OTP bypass
  let email = faker.internet.email();
  email = `${email.split('@')[0]}+test@${email.split('@')[1]}`;
  const password = 'TestPassword123';

  await page.goto('/sign-up');

  await page.getByLabel('Name').fill(faker.person.fullName());
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);

  await page.getByRole('button', { name: 'Create account' }).click();

  // Verify email with test OTP code (000000)
  await page.getByLabel('Enter verification code').fill('000000');
  await page.getByRole('button', { name: 'Verify email' }).click();

  // Verify successful sign-up by checking for sidebar
  await expect(page.getByText('Main navigation')).toBeVisible();

  return { email, password };
};

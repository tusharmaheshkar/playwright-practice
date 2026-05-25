import { test, expect } from '@playwright/test';

test('navigate to presolv360 login, go to register page and fill registration form', async ({ page }) => {
  let screenshotCount = 1;

  const takeScreenshot = async (name: string) => {
    await page.screenshot({
      path: `screenshots/${String(screenshotCount++).padStart(2, '0')}-${name}.png`,
      fullPage: true,
    });
  };

  await page.goto('https://presolv360.com/login');
  await takeScreenshot('login-page-opened');

  await expect(page).toHaveURL('https://presolv360.com/login');
  await takeScreenshot('login-url-verified');

  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await takeScreenshot('login-heading-visible');

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await takeScreenshot('username-visible');

  await page.getByRole('link', { name: 'Create account' }).click();
  await takeScreenshot('clicked-create-account');

  await expect(page).toHaveURL('https://presolv360.com/register');
  await takeScreenshot('register-url-verified');

  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  await takeScreenshot('register-heading-visible');

  await expect(page.getByPlaceholder('First Name*')).toBeVisible();
  await takeScreenshot('first-name-visible');

  await expect(page.getByPlaceholder('Last Name*')).toBeVisible();
  await takeScreenshot('last-name-visible');

  await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  await takeScreenshot('create-account-button-visible');

  await page.getByPlaceholder('First Name*').fill('Tushar');
  await takeScreenshot('first-name-filled');

  await page.getByPlaceholder('Last Name*').fill('Maheshkar');
  await takeScreenshot('last-name-filled');

  await page.getByRole('textbox', { name: 'Mobile' }).fill('9074849489');
  await takeScreenshot('mobile-filled');

  await page.getByRole('textbox', { name: 'Email*' }).fill('tusharmaheshkar@gmail.com');
  await takeScreenshot('email-filled');

  await page.getByPlaceholder('Organization*').fill('test org');
  await takeScreenshot('organization-filled');

  await page.getByPlaceholder('Username*: Minimum 6 characters').fill('zztusharzz');
  await takeScreenshot('username-filled');

  await page.getByPlaceholder('Password*', { exact: true }).fill('HelloWorld123');
  await takeScreenshot('password-filled');

  await page.getByPlaceholder('Confirm Password*: Should be same as Password').fill('HelloWorld123');
  await takeScreenshot('confirm-password-filled');

  await page.getByRole('radio', { name: 'Party' }).check();
  await takeScreenshot('party-radio-checked');

  await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
  await takeScreenshot('terms-checkbox-checked');

  await expect(page.getByPlaceholder('First Name*')).toHaveValue('Tushar');
  await takeScreenshot('first-name-value-verified');

  await expect(page.getByPlaceholder('Last Name*')).toHaveValue('Maheshkar');
  await takeScreenshot('last-name-value-verified');

  await expect(page.getByRole('textbox', { name: 'Mobile' })).toHaveValue('9074849489');
  await takeScreenshot('mobile-value-verified');

  await expect(page.getByRole('textbox', { name: 'Email*' })).toHaveValue('tusharmaheshkar@gmail.com');
  await takeScreenshot('email-value-verified');

  await expect(page.getByPlaceholder('Organization*')).toHaveValue('test org');
  await takeScreenshot('organization-value-verified');

  await expect(page.getByPlaceholder('Username*: Minimum 6 characters')).toHaveValue('zztusharzz');
  await takeScreenshot('username-value-verified');

  await expect(page.getByRole('radio', { name: 'Party' })).toBeChecked();
  await takeScreenshot('party-radio-verified');

  await expect(page.getByRole('checkbox', { name: 'I have read and agree to the' })).toBeChecked();
  await takeScreenshot('terms-checkbox-verified');

  await expect(page.getByRole('button', { name: 'Create Account' })).toBeEnabled();
  await takeScreenshot('create-account-button-enabled');
});
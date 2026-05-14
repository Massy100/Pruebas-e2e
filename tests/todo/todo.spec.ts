import { test, expect } from '@playwright/test';

test('debería agregar una tarea a la lista', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  await page.getByPlaceholder('What needs to be done?').fill('Aprender Playwright');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  await expect(page.getByText('Aprender Playwright')).toBeVisible();

//   page.getByRole('button', { name: 'Submit' })
//   page.getByLabel('Email')
//   page.getByText('Welcome')
//   page.getByPlaceholder('Search...')
//   page.getByTestId('submit-btn')

//   page.locator('.btn-primary')
//   page.locator('#submitButton')
});
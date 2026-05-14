import {expect, test} from '@playwright/test';

test('successfully logs in with valid credentials', async ({page}) => {
    await page.goto('/login.html');
    
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('mypassword');
    await page.getByRole('button', {name: 'Sign in'}).click();

    await expect(page).toHaveURL('/dashboard');
    
    await page.waitForLoadState('networkidle');

});
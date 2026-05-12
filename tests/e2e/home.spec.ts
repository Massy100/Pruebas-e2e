// test/e2e/home.spec.ts

import {test, expect} from '@playwright/test'

test('homepage loads correctly', async ({page}) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/My app/)
    const header = page.locator('h1')
    await expect(header).toHaveText('Welcome to My Personal Project')
})
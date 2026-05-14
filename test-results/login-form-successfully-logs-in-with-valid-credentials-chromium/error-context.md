# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login/form.spec.ts >> successfully logs in with valid credentials
- Location: tests/login/form.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Email')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "404" [level=1] [ref=e3]
  - paragraph [ref=e4]:
    - strong [ref=e5]: File not found
  - paragraph [ref=e6]: The site configured at this address does not contain the requested file.
  - paragraph [ref=e7]:
    - text: If this is your site, make sure that the filename case matches the URL as well as any file permissions.
    - text: For root URLs (like
    - code [ref=e8]: http://example.com/
    - text: ) you must provide an
    - code [ref=e9]: index.html
    - text: file.
  - paragraph [ref=e10]:
    - link "Read the full documentation" [ref=e11] [cursor=pointer]:
      - /url: https://help.github.com/pages/
    - text: for more information about using
    - strong [ref=e12]: GitHub Pages
    - text: .
  - generic [ref=e13]:
    - link "GitHub Status" [ref=e14] [cursor=pointer]:
      - /url: https://githubstatus.com
    - text: —
    - link "@githubstatus" [ref=e15] [cursor=pointer]:
      - /url: https://twitter.com/githubstatus
  - link [ref=e16] [cursor=pointer]:
    - /url: /
```

# Test source

```ts
  1  | import {expect, test} from '@playwright/test';
  2  | 
  3  | test('successfully logs in with valid credentials', async ({page}) => {
  4  |     await page.goto('/login.html');
  5  |     
> 6  |     await page.getByLabel('Email').fill('user@example.com');
     |                                    ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  7  |     await page.getByLabel('Password').fill('mypassword');
  8  |     await page.getByRole('button', {name: 'Sign in'}).click();
  9  | 
  10 |     await expect(page).toHaveURL('/dashboard');
  11 |     
  12 |     await page.waitForLoadState('networkidle');
  13 | 
  14 | });
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/home.spec.ts >> homepage loads correctly
- Location: tests/e2e/home.spec.ts:5:5

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /My app/
Received string:  "Page not found · GitHub Pages"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    14 × unexpected value "Page not found · GitHub Pages"

```

```yaml
- heading "404" [level=1]
- paragraph:
  - strong: File not found
- paragraph: The site configured at this address does not contain the requested file.
- paragraph:
  - text: If this is your site, make sure that the filename case matches the URL as well as any file permissions. For root URLs (like
  - code: http://example.com/
  - text: ) you must provide an
  - code: index.html
  - text: file.
- paragraph:
  - link "Read the full documentation":
    - /url: https://help.github.com/pages/
  - text: for more information about using
  - strong: GitHub Pages
  - text: .
- link "GitHub Status":
  - /url: https://githubstatus.com
- text: —
- link "@githubstatus":
  - /url: https://twitter.com/githubstatus
- link:
  - /url: /
```

# Test source

```ts
  1  | // test/e2e/home.spec.ts
  2  | 
  3  | import {test, expect} from '@playwright/test'
  4  | 
  5  | test('homepage loads correctly', async ({page}) => {
  6  |     await page.goto('/')
> 7  |     await expect(page).toHaveTitle(/My app/)
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
  8  |     const header = page.locator('h1')
  9  |     await expect(header).toHaveText('Welcome to My Personal Project')
  10 | })
```
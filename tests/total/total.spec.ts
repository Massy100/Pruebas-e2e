import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/todomvc');
});


// 1. Agregar una tarea
test('agregar una tarea', async ({ page }) => {
  await page.getByPlaceholder('What needs to be done?')
    .fill('Hello world Playwright');

  await page.keyboard.press('Enter');

  await expect(page.locator('.todo-list li')).toContainText([
    'Hello world Playwright'
  ]);
});


// 2. Completar una tarea
test('completar una tarea', async ({ page }) => {
  await page.getByPlaceholder('What needs to be done?')
    .fill('Tarea 1');

  await page.keyboard.press('Enter');

  const checkbox = page.getByRole('checkbox').first();
  await checkbox.check();

  const item = page.locator('.todo-list li').first();
  await expect(item).toHaveClass(/completed/);
});


// 3. Filtrar tareas
test('filtrar tareas', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  // Crear tareas
  for (let i = 1; i <= 3; i++) {
    await input.fill(`Tarea ${i}`);
    await page.keyboard.press('Enter');
  }

  // Completar la primera
  const tarea = page.locator('.todo-list li', {
    hasText: 'Tarea 1'
    });

    await tarea.getByRole('checkbox').check();

  // Filtrar activas
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(2);

  // Filtrar completadas
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
});


// 4. Eliminar una tarea
test('eliminar una tarea', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Eliminar tarea');
  await page.keyboard.press('Enter');

  const item = page.locator('.todo-list li').first();

  // Hover para mostrar botón
  await item.hover();

  // Botón eliminar
  await item.locator('.destroy').click();

  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
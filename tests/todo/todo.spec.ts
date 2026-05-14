import { test, expect } from '@playwright/test';

test('Flujo completo de pruebas en TodoMVC', async ({ page }) => {

  // 1. NAVEGAR Y AGREGAR UNA TAREA

  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Escribir "Hello world Playwright" en el input
  await page.getByPlaceholder('What needs to be done?').fill('Hello world Playwright');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  // Verificar que aparece en la lista
  await expect(page.getByText('Hello world Playwright')).toBeVisible();

  // 2. COMPLETAR UNA TAREA

  // Agregar otra tarea para completar
  await page.getByPlaceholder('What needs to be done?').fill('Tarea para completar');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  // Hacer click en el checkbox de la nueva tarea
  const tareaParaCompletar = page.getByText('Tarea para completar');
  const checkboxDeTarea = tareaParaCompletar.locator('xpath=..').locator('input[type="checkbox"]');
  await checkboxDeTarea.check();

  // Verificar que tiene la clase CSS de completado (subir 2 niveles al <li>)
  const itemCompletado = tareaParaCompletar.locator('xpath=../..');
  await expect(itemCompletado).toHaveClass(/completed/);

  // 3. FILTRAR TAREAS

  // Limpiar el estado actual y comenzar de nuevo
  // Primero, desmarcar la tarea completada
  await checkboxDeTarea.uncheck();
  
  // Eliminar tareas existentes (hover y click en X)
  const todasLasTareas = page.locator('.todo-list li');
  const cantidadTareas = await todasLasTareas.count();
  for (let i = 0; i < cantidadTareas; i++) {
    const tarea = todasLasTareas.first();
    await tarea.hover();
    await tarea.locator('.destroy').click();
  }
  
  // Agregar tres tareas nuevas
  const tareas = ['Tarea 1 - Activa', 'Tarea 2 - Activa', 'Tarea 3 - Para completar'];
  for (const tarea of tareas) {
    await page.getByPlaceholder('What needs to be done?').fill(tarea);
    await page.getByPlaceholder('What needs to be done?').press('Enter');
  }
  
  // Completar una tarea (la tercera)
  const terceraTarea = page.getByText('Tarea 3 - Para completar');
  const checkboxTercera = terceraTarea.locator('xpath=..').locator('input[type="checkbox"]');
  await checkboxTercera.check();
  
  // Navegar a "Active"
  await page.getByRole('link', { name: 'Active' }).click();
  
  // Verificar que tiene dos items (las activas)
  const itemsActivos = page.locator('.todo-list li:not(.completed)');
  await expect(itemsActivos).toHaveCount(2);
  await expect(page.getByText('Tarea 1 - Activa')).toBeVisible();
  await expect(page.getByText('Tarea 2 - Activa')).toBeVisible();
  await expect(page.getByText('Tarea 3 - Para completar')).not.toBeVisible();
  
  // Navegar a "Completed"
  await page.getByRole('link', { name: 'Completed' }).click();
  
  // Verificar que tiene un item (la completada)
  const itemsCompletados = page.locator('.todo-list li.completed');
  await expect(itemsCompletados).toHaveCount(1);
  await expect(page.getByText('Tarea 3 - Para completar')).toBeVisible();
  await expect(page.getByText('Tarea 1 - Activa')).not.toBeVisible();
  await expect(page.getByText('Tarea 2 - Activa')).not.toBeVisible();
  
  // Regresar a "All" para la siguiente prueba
  await page.getByRole('link', { name: 'All' }).click();

  // 4. ELIMINAR UNA TAREA

  // Agregar una tarea específica para eliminar
  await page.getByPlaceholder('What needs to be done?').fill('Tarea a eliminar');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  // Verificar que aparece
  const tareaAEliminar = page.getByText('Tarea a eliminar');
  await expect(tareaAEliminar).toBeVisible();
  
  // Hacer hover para mostrar el botón de eliminar
  const elementoLi = tareaAEliminar.locator('xpath=..');
  await elementoLi.hover();
  
  // Hacer click en el botón de eliminar
  await elementoLi.locator('.destroy').click();
  
  // Verificar que la tarea ya no aparece
  await expect(tareaAEliminar).not.toBeVisible();
});
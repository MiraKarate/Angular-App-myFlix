import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Navigiere zur Seite mit dem Login-Formular
  await page.goto('http://localhost:4200/Angular-App-myFlix/');

  // Klicke auf den Login-Button
  await page.getByRole('button', { name: 'Login' }).click();

  // Fülle das Benutzername- und Passwortfeld aus
  await page.getByPlaceholder('Username').fill('username');
  await page.getByPlaceholder('Password').fill('password');

  // Klicke erneut auf den Login-Button, um sich anzumelden
  await page.getByRole('button', { name: 'Login' }).click();

  // Warte auf eine Seite, die nur für angemeldete Benutzer zugänglich ist
  await page.waitForLoadState('networkidle');

  // Überprüfe, ob die Anmeldung erfolgreich war, indem du den local storage überprüfst
  const user = await page.evaluate(() => localStorage.getItem('user'));
  const token = await page.evaluate(() => localStorage.getItem('token'));

  // Erwarte, dass Benutzer und Token im localStorage vorhanden sind
  expect(user).not.toBeNull();
  expect(token).not.toBeNull();
});

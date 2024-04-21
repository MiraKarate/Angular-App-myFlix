import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  try {
    // Navigiere zur Seite mit dem Login-Formular
    await page.goto('https://MiraKarate.github.io/Angular-App-myFlix/');

    // Klicke auf den Login-Button
    await page.getByRole('button', { name: 'Login' }).click();

    // Fülle das Benutzername- und Passwortfeld aus
    await page.getByPlaceholder('Username').fill('username');
    await page.getByPlaceholder('Password').fill('password');

    // Klicke erneut auf den Login-Button, um sich anzumelden
    await page.getByRole('button', { name: 'Login' }).click();

    // Warte darauf, dass die Seite vollständig geladen ist
    await page.waitForLoadState('networkidle');

    // Ausgabe des localStorage-Inhalts
    console.log(await page.evaluate(() => localStorage));

    // Warte auf ein sichtbares Element auf der Seite, das nur für angemeldete Benutzer sichtbar ist
    // Warte auf ein sichtbares Element auf der Seite, das nur für angemeldete Benutzer sichtbar ist
    await page.waitForSelector('mat-card-title', { state: 'visible' });


    // Überprüfe, ob die Anmeldung erfolgreich war, indem du den local storage überprüfst
    const user = await page.evaluate(() => localStorage.getItem('user'));
    const token = await page.evaluate(() => localStorage.getItem('token'));

    // Erwarte, dass Benutzer und Token im localStorage vorhanden sind
    expect(user).not.toBeNull();
    expect(token).not.toBeNull();
  } catch (error) {
    console.error(error);
    throw error;
  }
});
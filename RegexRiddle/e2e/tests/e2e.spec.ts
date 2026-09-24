import { expect, test, type Page } from "@playwright/test";
const DEMO_PASSWORD = "Password123!";
const registeredUsername = "e2e_studente";
async function login(page: Page, username: string, password = DEMO_PASSWORD): Promise<void> {
  await page.goto("/login");
  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole("button", { name: "Entra" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}
async function expectAuthenticatedNavigation(page: Page): Promise<void> {
  const nav = page.locator(".top-nav");
  await expect(nav.getByRole("link", { name: "Sfide" })).toBeVisible();
  await expect(nav.locator(`a[href="/profile"]`)).toBeVisible();
}
async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasHorizontalOverflow).toBe(false);
}
test.describe("Desktop E2E Tests for RegexRiddle", () => {
  test.use({ viewport: { height: 720, width: 1280 } });
  test("1. Un nuovo utente si registra e accede da desktop", async ({ page }) => {
    await page.goto("/register");
    await page.locator('input[type="text"]').fill(registeredUsername);
    await page.locator('input[type="password"]').fill(DEMO_PASSWORD);
    await page.getByRole("button", { name: "Crea account" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expectAuthenticatedNavigation(page);
  });
  test("2. Un utente esegue il logout da desktop", async ({ page }) => {
    await login(page, "chiara_rossi");
    await expectAuthenticatedNavigation(page);
    await page.goto("/profile");
    await page.getByRole("button", { name: "Esci dall'account" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("link", { name: "Accedi" })).toBeVisible();
  });
  test("3. Un utente crea una nuova sfida da desktop", async ({ page }) => {
    await login(page, "luca_bianchi");
    await page.goto("/create");
    await page.getByPlaceholder("es. Validatore Email").fill("CAP italiano E2E");
    await page.getByPlaceholder("Spiega l'obiettivo della regex...").fill("Riconosci un CAP italiano");
    await page.getByPlaceholder("es. ^[a-z]+$").fill("^\\d{5}$");
    await page.getByPlaceholder("Stringa valida").fill("80125");
    await page.getByPlaceholder("Stringa invalida").fill("8012A");
    await page.getByPlaceholder("Stringhe che LA TUA REGEX SEGRETA accetta").fill("00100\n90145");
    await page.getByPlaceholder("Stringhe che LA TUA REGEX SEGRETA rifiuta").fill("ABCDE\n1234");
    await page.getByRole("button", { name: "Pubblica Sfida" }).click();
    await expect(page.getByText("Challenge created successfully!")).toBeVisible();
  });
  test("4. Un utente invia una soluzione errata da desktop", async ({ page }) => {
    await login(page, "chiara_rossi");
    await page.locator('.challenge-card').first().click();
    await page.getByPlaceholder("/tuo-pattern/i").fill(".*");
    await page.getByRole("button", { name: "Esegui" }).click();
    await expect(page.getByText("Tentativo Fallito")).toBeVisible();
    await expect(page.locator('text=Positivi Matchati')).toBeVisible();
    await expect(page.locator('text=Negativi Esclusi')).toBeVisible();
  });
  test("5. Un utente risolve una sfida da desktop", async ({ page }) => {
    await login(page, "chiara_rossi");
    await page.goto("/dashboard");
    await page.locator('.challenge-card', { hasText: 'PIN numerico' }).click();
    await page.getByPlaceholder("/tuo-pattern/i").fill("^\\d{4}$");
    await page.getByRole("button", { name: "Esegui" }).click();
    await expect(page.getByText("Tentativo Corretto!")).toBeVisible();
  });
});
test.describe("Mobile E2E Tests for RegexRiddle", () => {
  test.use({ viewport: { height: 844, width: 390 } });
  test("6. Un visitatore raggiunge il login da Documentazione su mobile", async ({ page }) => {
    await page.goto("/how-it-works");
    await expectNoHorizontalOverflow(page);
    await page.locator('.top-nav-inner').getByRole("link", { name: "Accedi" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expectNoHorizontalOverflow(page);
  });
  test("7. Un utente accede e usa la navigazione mobile", async ({ page }) => {
    await login(page, "davide_mancini");
    await expectAuthenticatedNavigation(page);
    await expectNoHorizontalOverflow(page);
    await page.locator(".top-nav-inner").getByRole("link", { name: "Leaderboard" }).click();
    await expect(page).toHaveURL(/\/leaderboard$/);
    await expectNoHorizontalOverflow(page);
  });
  test("8. Un utente apre una sfida su mobile senza overflow", async ({ page }) => {
    await login(page, "davide_mancini");
    await page.locator('.challenge-card').first().click();
    await expect(page.getByText("Esempi")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
  test("9. Un utente consulta profilo e classifica su mobile", async ({ page }) => {
    await login(page, "davide_mancini");
    await page.goto("/profile");
    await expect(page.getByRole("heading", { name: "Il tuo Profilo" })).toBeVisible();
    await expect(page.getByText("davide_mancini")).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await page.goto("/leaderboard");
    await expect(page.getByRole("heading", { name: "Classifica Globale" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
  test("10. Un utente esegue il logout e viene protetto su mobile", async ({ page }) => {
    await login(page, "davide_mancini");
    await page.goto("/profile");
    await page.getByRole("button", { name: "Esci dall'account" }).click();
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/); // Modified for standard ProtectedRoute behavior
    await expectNoHorizontalOverflow(page);
  });
});
import { expect, test } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Seu e-mail:" })
    .fill("johndoe@example.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText(
    "E-mail enviado com sucesso! Verifique sua caixa de entrada.",
  );

  await expect(toast).toBeVisible();

});

test("sign in with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Seu e-mail:" })
    .fill("wrong-email@example.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText(
    "Ocorreu um erro ao enviar o e-mail. Tente novamente.",
  );

  await expect(toast).toBeVisible();
});

test("navigate to register a new restaurant page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Novo estabelecimento" }).click();

  expect(page.url()).toContain("/sign-up");
});

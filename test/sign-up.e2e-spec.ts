import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do estabelecimento:" })
    .fill("Pizza Shop");
  await page.getByRole("textbox", { name: "Seu nome:" }).fill("John Doe");
  await page.getByRole("textbox", { name: "Seu telefone:" }).fill("1234567890");
  await page
    .getByRole("textbox", { name: "Seu e-mail:" })
    .fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText(
    "Restaurante cadastrado com sucesso! Verifique sua caixa de entrada.",
  );

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test("sign up with error", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do estabelecimento:" })
    .fill("Wrong Name");
  await page.getByRole("textbox", { name: "Seu nome:" }).fill("John Doe");
  await page.getByRole("textbox", { name: "Seu telefone:" }).fill("1234567890");
  await page
    .getByRole("textbox", { name: "Seu e-mail:" })
    .fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText(
    "Ocorreu um erro ao cadastrar o restaurante. Tente novamente.",
  );

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test("navigate to login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Fazer login" }).click();

  expect(page.url()).toContain("/sign-in");
});

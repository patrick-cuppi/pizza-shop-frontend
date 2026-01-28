import { expect, test } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();

  await page.getByText("Perfil da loja").click();

  await page.getByRole("textbox", { name: "Nome:" }).fill("Pizza Shop 2");
  await page
    .getByRole("textbox", { name: "Descrição:" })
    .fill("Esta é uma loja de teste atualizada.");

  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Perfil atualizado com sucesso!");
  expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close", exact: true }).click();

  await page.waitForLoadState("networkidle");

  expect(page.getByRole("button", { name: "Pizza Shop 2" })).toBeVisible();
});

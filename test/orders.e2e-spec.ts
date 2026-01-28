import { expect, test } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  expect(page.getByRole("cell", { name: "Customer 10" })).toBeVisible();
});

test("paginate orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Próxima página" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).not.toBeVisible();

  expect(
    page.getByRole("cell", { name: "Customer 11", exact: true }),
  ).toBeVisible();
  expect(page.getByRole("cell", { name: "Customer 20" })).toBeVisible();

  await page.getByRole("button", { name: "Última página" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 51", exact: true }),
  ).toBeVisible();
  expect(page.getByRole("cell", { name: "Customer 60" })).toBeVisible();

  await page.getByRole("button", { name: "Página anterior" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 41", exact: true }),
  ).toBeVisible();
  expect(page.getByRole("cell", { name: "Customer 50" })).toBeVisible();

  await page.getByRole("button", { name: "Primeira página" }).click();

  expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  expect(page.getByRole("cell", { name: "Customer 10" })).toBeVisible();
});

test("filter by orderId", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("textbox", { name: "ID do pedido" }).fill("order-5");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  expect(page.getByRole("cell", { name: "order-5" })).toBeVisible();
});

test("filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do cliente" })
    .fill("Customer 5");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  expect(page.getByRole("cell", { name: "Customer 5" })).toBeVisible();
});

test("filter by status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByLabel("Pendente").click();
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  const tableRows = await page.getByRole("cell", { name: "Pendente" }).all();
  expect(tableRows).toBeGreaterThan(0);
});

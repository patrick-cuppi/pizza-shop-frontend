import { expect, test } from "@playwright/test";

test("display day orders amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("20", { exact: true })).toBeVisible();
  await expect(page.getByText("--3% em relação a ontem.")).toBeVisible();
});

test("display month orders amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("205")).toBeVisible();
  await expect(page.getByText("+3%em relação ao último mês")).toBeVisible();
});

test("display month canceled orders amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("22", { exact: true })).toBeVisible();
  await expect(page.getByText("+7%em relação ao último mês")).toBeVisible();
});

test("display month revenue orders amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("R$ 125,00")).toBeVisible();
  await expect(page.getByText("+4%")).toBeVisible();
});

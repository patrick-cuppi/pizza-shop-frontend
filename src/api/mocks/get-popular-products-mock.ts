import { http, HttpResponse } from "msw";
import type { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", async () => {
  return HttpResponse.json([
    { product: "Pizza Margherita", amount: 10 },
    { product: "Pepperoni Pizza", amount: 8 },
    { product: "BBQ Chicken Pizza", amount: 6 },
    { product: "Veggie Pizza", amount: 4 },
    { product: "Hawaiian Pizza", amount: 2 },
  ]);
});

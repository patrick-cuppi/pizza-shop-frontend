import { http, HttpResponse } from "msw";
import type { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", async () => {
  return HttpResponse.json({
    id: "manager-456",
    name: "Pizza Shop",
    description: "A popular pizza restaurant",
    managerId: "user-123",
    createdAt: new Date(),
    updatedAt: null,
  });
});

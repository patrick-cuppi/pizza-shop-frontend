import { http, HttpResponse } from "msw";
import type {
  GetOrderDetailsResponse,
  OrderDetailsProps,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  OrderDetailsProps,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", async ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    totalInCents: 3900,
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        product: {
          name: "Pizza Margherita",
        },
        quantity: 2,
      },
      {
        id: "order-item-2",
        priceInCents: 1900,
        product: {
          name: "Pizza Pepperoni",
        },
        quantity: 1,
      },
    ],
  });
});

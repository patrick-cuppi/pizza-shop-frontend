import { api } from "@/lib/axios";

export interface OrderDetailsProps {
  orderId: string;
}

export interface GetOrderDetailsResponse {
  id: string;
  createdAt: string;
  status: "pending" | "processing" | "delivering" | "delivered" | "canceled";
  totalInCents: number;
  customer: {
    name: string;
    phone: string | null;
    email: string;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetails({ orderId }: OrderDetailsProps) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`);

  return response.data;
}

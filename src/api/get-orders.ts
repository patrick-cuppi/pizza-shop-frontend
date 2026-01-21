import { api } from "@/lib/axios";

export interface GetOrdersQuery {
  pageIndex?: number | null;
}

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    customerName: string;
    status: "pending" | "processing" | "delivering" | "delivered" | "canceled";
    createdAt: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({ pageIndex = 0 }: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
    },
  });
  return response.data;
}

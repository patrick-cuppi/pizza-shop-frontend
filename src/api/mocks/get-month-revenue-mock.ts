import { http, HttpResponse } from "msw";
import type { GetMonthRevenueResponse } from "../get-month-revenue";

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>("/metrics/month-receipt", async () => {
  return HttpResponse.json({
    receipt: 12500,
    diffFromLastMonth: 4,
  });
});

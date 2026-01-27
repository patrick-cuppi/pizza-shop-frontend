import { http, HttpResponse } from "msw";
import type { GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", async () => {
  return HttpResponse.json([
    { date: "2024-01-01", receipt: 1500 },
    { date: "2024-01-02", receipt: 2300 },
    { date: "2024-01-03", receipt: 1800 },
    { date: "2024-01-04", receipt: 2000 },
    { date: "2024-01-05", receipt: 1700 },
    { date: "2024-01-06", receipt: 2500 },
    { date: "2024-01-06", receipt: 2700 },
  ]);
});

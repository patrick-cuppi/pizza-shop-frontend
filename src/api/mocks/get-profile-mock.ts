import { http, HttpResponse } from "msw";
import type { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  async () => {
    return HttpResponse.json({
      id: "user-123",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: null,
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);

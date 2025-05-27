import { request } from "@playwright/test";

export const getDefaultAPIContext = async () => {
  return await request.newContext({
    baseURL: process.env.API_TESTS_URL,
  });
};

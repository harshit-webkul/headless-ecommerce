import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../utils/adminApiClient";
import { logoutMutation } from "../../../mutations/session-mutation";

test.describe("Admin API Tests", () => {
  let apiClient: GraphQLClient;

  test.beforeAll(async () => {
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    /**
     * CRITICAL FIX: clear stale token first
     */ 
    apiClient.clearToken();

    /**
     *  Now login to run  
     */ 
    await apiClient.adminLogin("admin@example.com", "admin123", true);

    expect(apiClient.getAdminToken()).not.toBeNull();
  });

  test("Admin accessToken should be available", async () => {
    expect(apiClient.getAdminToken()).not.toBeNull();
  });

  test("Admin should logout successfully", async () => {
    const response = await apiClient.execute(
      logoutMutation,
      {},
      { withAuth: true }
    );

    expect(response.userLogout.success).toBe(true);
    expect(response.userLogout.message).toContain(
      "Success: User logout successfully."
    );

    /**
     * Clear local token AFTER logout
     */
    apiClient.clearToken();
    expect(apiClient.getAdminToken()).toBeNull();
  });

  test("Admin should be able to login again after logout", async () => {
    await apiClient.adminLogin("admin@example.com", "admin123", true);

    expect(apiClient.getAdminToken()).not.toBeNull();
  });
});

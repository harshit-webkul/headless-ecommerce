import { test, expect } from '@playwright/test';
import { GraphQLClient } from '../../../utils/adminApiClient';
import { logoutMutation } from '../../../mutations/session-mutation';

test.describe('Admin API Tests', () => {
  let apiClient: GraphQLClient;

  test.beforeAll(async () => {
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    await apiClient.adminLogin('admin@example.com', 'admin123', true);
  });

  test('Admin accessToken', async () => {
    expect(apiClient.getAdminToken()).not.toBeNull();
  });

  test('Admin should logout successfully', async () => {
    /**
     * Execute logout mutation
     */
    const response = await apiClient.execute(logoutMutation, {}, { withAuth: true });

    expect(response.userLogout.success).toBe(true);
    expect(response.userLogout.message).toContain('Success: User logout successfully.');

      // Clear token manually
    apiClient.setAdminToken('');

      // Re-login if needed for subsequent tests
     await apiClient.adminLogin('admin@example.com', 'admin123', true);
  });
});
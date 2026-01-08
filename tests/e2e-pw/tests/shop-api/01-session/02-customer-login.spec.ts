import { test, expect } from '@playwright/test';
import { GraphQLCustomerClient } from '../../../utils/customerApiClient';
import { customerSignInMutation } from '../../../mutations/shop-mutation/session-mutation/session-mutation';
import * as fs from "fs";

test.describe('Customer API Tests', () => {
  let apiClient: GraphQLCustomerClient;

  const signUpCustomerResponse = fs.readFileSync(
          "signup-customer-shop-createResponse.json",
          "utf-8"
      );
      const cre = JSON.parse(signUpCustomerResponse);
      console.log("signup customer Response Data:", cre);
      const customer_email = cre.customerSignUp.customer.email;
      console.log("create-locale ID to update:", customer_email);

      const customer_password = cre.customerSignUp.customer.password;
      const randomSuffix = Date.now();

  test.beforeAll(async () => {
    apiClient = new GraphQLCustomerClient(GraphQLCustomerClient.baseURL);
    await apiClient.customerLogin(customer_email, customer_password, true);
  });

  test('Admin accessToken', async () => {
    expect(apiClient.getCustomerToken()).not.toBeNull();
  });

  test('Customer should logout successfully', async () => {
    /**
     * Execute logout mutation
     */
    const response = await apiClient.execute(customerSignInMutation, {}, { withAuth: true });

    expect(response.userLogout.success).toBe(true);
    expect(response.userLogout.message).toContain('Success: User logout successfully.');

      // Clear token manually
    apiClient.setCustomerToken('');

      // Re-login if needed for subsequent tests
     await apiClient.customerLogin('admin@example.com', 'admin123', true);
  });
});
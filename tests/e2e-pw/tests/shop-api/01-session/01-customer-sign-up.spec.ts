import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';
import { GraphQLCustomerClient } from '../../../utils/customerApiClient';
import { logoutMutation } from '../../../mutations/session-mutation';
import { customerSignUpMutation } from '../../../mutations/shop-mutation/session-mutation/session-mutation';
import { DBClient } from '../../../utils/dbClient';

  test.describe('Customer Session Tests', () => {
    const randomSuffix = Date.now();
    const signupPayload = {
        firstName: `Customer${randomSuffix}`,
        lastName: '1',
        email: `customer${randomSuffix}@example.com`,
        password: 'admin123',
        passwordConfirmation: 'admin123',
        subscribedToNewsLetter: true,
        agreement: true,
        deviceToken: '11111',
        deviceName: 'Nokia'
    };

    test('Customer SignUp - creates a new customer and returns tokens', async () => {
      const client = new GraphQLCustomerClient();
      const res = await client.customerExecute(customerSignUpMutation, { input: signupPayload }, { withAuth: false });

      expect(res.customerSignUp).toBeTruthy();
      expect(res.customerSignUp.success).toBeTruthy();
      expect (res.customerSignUp.message).toContain('Success: Customer registered and login successfully.');
      expect(res.customerSignUp.accessToken).toBeTruthy();
      expect(res.customerSignUp.customer).toBeTruthy();
      expect(res.customerSignUp.customer.email).toEqual(signupPayload.email);

      const filePath = path.resolve(process.cwd(), 'signup-customer-shop-createResponse.json');
      fs.writeFileSync(filePath, JSON.stringify(res, null, 2), 'utf-8');

      const customer_payload = path.resolve(process.cwd(), 'customer-payload-shop-createResponse.json');
      fs.writeFileSync(customer_payload, JSON.stringify(signupPayload, null, 2), 'utf-8');
    });
  });
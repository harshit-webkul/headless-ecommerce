import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';
import { GraphQLClient } from '../../../utils/adminApiClient';
import { logoutMutation } from '../../../mutations/session-mutation';
import { customerSignUpMutation } from '../../../mutations/shop-mutation/session-mutation/session-mutation';
import { DBClient } from '../../../utils/dbClient';

  test.describe('Customer Session Tests', () => {
    const signupPayload = {
      input: {
        firstName: 'Customer',
        lastName: '1',
        email: 'customer1@example.com',
        password: 'admin123',
        passwordConfirmation: 'admin123',
        subscribedToNewsLetter: true,
        agreement: true,
        deviceToken: '11111',
        deviceName: 'Nokia'
      }
    };

    test('Customer SignUp - creates a new customer and returns tokens', async () => {
      const client = new GraphQLClient();
      // ensure unique email
      const exists = await DBClient.getRow('SELECT id FROM customers WHERE email = ?', [signupPayload.input.email]);
      let emailToUse = signupPayload.input.email;
      if (exists) {
        const suffix = Date.now();
        emailToUse = `customer1${suffix}@example.com`;
      }
      const input = { ...signupPayload.input, email: emailToUse };

      const res = await client.execute<any>(customerSignUpMutation, { input }, { withAuth: false });

      expect(res.customerSignUp).toBeTruthy();
      expect(res.customerSignUp.success).toBeTruthy();
      expect(res.customerSignUp.accessToken).toBeTruthy();
      expect(res.customerSignUp.customer).toBeTruthy();
      expect(res.customerSignUp.customer.email).toEqual(emailToUse);

      const dbRow = await DBClient.getRow('SELECT * FROM customers WHERE email = ?', [emailToUse]);
      expect(dbRow).not.toBeNull();
      expect(dbRow?.email).toEqual(emailToUse);

      const filePath = path.resolve(process.cwd(), 'signup-customer-shop-createResponse.json');
      fs.writeFileSync(filePath, JSON.stringify(res, null, 2), 'utf-8');
    });
  });
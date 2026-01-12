import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { setDefaultAddress, createCustomerAddress, getAllAddresses } from "../../../../../mutations/shop-mutation/customers/addresses/addresses-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Shop: Set customer default address via GraphQL API", () => {
    const signUpPayload = fs.readFileSync(
        "signup-customer-shop-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(signUpPayload);
    const accessToken = cre.customerSignUp.accessToken;
    const customer_id = Number(cre.customerSignUp.customer.id);

    test('set default address details via graphQL shop api', async () => {

        const client = new GraphQLCustomerClient();
        client.setCustomerToken(accessToken);

        const randomSuffix = Date.now();

        const customerAddressCredential = {
            companyName: `Stark Industries${randomSuffix}`,
            firstName: `john${randomSuffix}`,
            lastName: `Doe${randomSuffix}`,
            address: `3180 Bluff Street${randomSuffix}`,
            city: "GLEN CAMPBELL",
            postcode: `${randomSuffix}`,
            country: "US",
            state: "PA",
            phone: `${randomSuffix}`,
            email: `johndoe${randomSuffix}@example.com`,
            defaultAddress: false,
        };

        const createRes = await client.customerExecute(createCustomerAddress, { input: customerAddressCredential }, { withAuth: true });
        expect(createRes.createAddress.success).toBe(true);

        const address_id = Number(createRes.createAddress.address.id);

        const setDefaultRes = await client.customerExecute(setDefaultAddress, { id: address_id }, { withAuth: true });
        console.log('Set default response:', setDefaultRes);
        expect(setDefaultRes.setDefaultAddress.success).toBe(true);

        const getAllRes = await client.customerExecute(getAllAddresses, { page: 1, first: 10, input: {} }, { withAuth: true });

        const addresses = getAllRes?.addresses?.data;
        const defaultAddresses = addresses.filter((a: any) => a.defaultAddress === true);
        expect(defaultAddresses.length).toBe(1);
    });
});

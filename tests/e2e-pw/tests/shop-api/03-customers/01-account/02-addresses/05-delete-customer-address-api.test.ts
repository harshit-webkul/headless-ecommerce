import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { deleteCustomerAddress } from "../../../../../mutations/shop-mutation/customers/addresses/addresses-mutation";
import * as fs from "fs";

test.describe("Shop: Delete customer address via GraphQL API", () => {
    const signUpPayload = fs.readFileSync(
        "signup-customer-shop-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(signUpPayload);
    const accessToken = cre.customerSignUp.accessToken;

    const createCustomerAddressResponse = fs.readFileSync(
        "create-customer-address-shop-createResponse.json",
        "utf-8"
    );
    const created = JSON.parse(createCustomerAddressResponse);
    const address_id = Number(created.createAddress.address.id);

    test('delete customer address via graphQL shop api', async () => {
        const client = new GraphQLCustomerClient();
        // client.setCustomerToken(accessToken);

        const res = await client.customerExecute(deleteCustomerAddress, { id: address_id }, { withAuth: true });

        console.log('delete customer address Response:', res);

        expect(res.deleteAddress.success).toBe(true);
    });
});

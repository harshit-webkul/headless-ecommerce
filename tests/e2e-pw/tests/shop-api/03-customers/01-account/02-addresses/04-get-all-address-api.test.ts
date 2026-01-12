import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { getAllAddresses } from "../../../../../mutations/shop-mutation/customers/addresses/addresses-mutation";
import { createCustomerAddress } from "../../../../../mutations/shop-mutation/customers/addresses/addresses-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Shop: Get customer All addresses via GraphQL API", () => {
    const signUpPayload = fs.readFileSync(
        "signup-customer-shop-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(signUpPayload);
    const accessToken = cre.customerSignUp.accessToken;
    const customer_id = Number(cre.customerSignUp.customer.id);

    test("customer all addresses via graphQL shop api", async () => {
        const client = new GraphQLCustomerClient();

        const getAllAddressesResponse = await client.customerExecute(getAllAddresses, { page: 1, first: 10 }, { withAuth: true });

        console.log("customer all addresses Response:", getAllAddressesResponse);

        const outPath = path.resolve(process.cwd(), "get-customers-all-addresses-shop-createResponse.json");
        fs.writeFileSync(outPath, JSON.stringify(getAllAddressesResponse, null, 2), "utf-8");

        expect(Array.isArray(getAllAddressesResponse.addresses.data)).toBe(true);
    });

    test("To verify that the default address should be set as once via graphQL shop api", async () => {
        const client = new GraphQLCustomerClient();
        // client.setCustomerToken(accessToken);

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
            defaultAddress: true,
        };

        const createRes = await client.customerExecute(createCustomerAddress, { input: customerAddressCredential }, { withAuth: true });
        expect(createRes.createAddress.success).toBe(true);

         const outPath = path.resolve(process.cwd(), "create-customer-address-shop-createResponse.json");
        fs.writeFileSync(outPath, JSON.stringify(createRes, null, 2), "utf-8");


        const getAllAddressesResponse = await client.customerExecute(getAllAddresses, { page: 1, first: 10, input: {} }, { withAuth: true });

        console.log("FULL RESPONSE:", JSON.stringify(getAllAddressesResponse, null, 2));

        const addresses = getAllAddressesResponse?.addresses?.data;

        expect(Array.isArray(addresses)).toBe(true);
        expect(addresses.length).toBeGreaterThan(0);

        const defaultAddresses = addresses.filter((address: any) => address.defaultAddress === true);

        console.log("Default addresses found:", defaultAddresses.map((a: any) => a.id));

        expect(defaultAddresses.length).toBe(1);
    });
});

import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { getParticularCustomerAddress } from "../../../../../mutations/shop-mutation/customers/addresses/addresses-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Shop: Get Particular Customer Address via GraphQL API", () => {
    const signUpPayload = fs.readFileSync(
        "signup-customer-shop-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(signUpPayload);
    // const accessToken = cre.customerSignUp.accessToken;

   

    test("get particular customer address via graphQL shop api", async () => {
        const createCustomerAddressResponse = fs.readFileSync(
            "create-customer-address-shop-createResponse.json",
            "utf-8"
        );
        const created = JSON.parse(createCustomerAddressResponse);
        const address_id = Number(created.createAddress.address.id);
        const client = new GraphQLCustomerClient();
        // client.setCustomerToken(accessToken);

        const res = await client.customerExecute(getParticularCustomerAddress, { id: address_id }, { withAuth: true });

        console.log('Get Particular customer address Response:', res);

        const outPath = path.resolve(process.cwd(), "get-particular-customer-address-shop-response.json");
        fs.writeFileSync(outPath, JSON.stringify(res, null, 2), "utf-8");

        expect(res.address.id).toEqual(address_id.toString());
    });
});

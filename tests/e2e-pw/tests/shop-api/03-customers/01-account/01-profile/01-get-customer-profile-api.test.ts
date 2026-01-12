import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
import { customerAccountInfoQuery } from "../../../../../mutations/shop-mutation/customers/account/profile-mutation";
import * as fs from "fs";
import path from "path";
import { DBClient } from "../../../../../utils/dbClient";

test.describe("Get Customer Profile API", () => {

    const signUpCustomerPayload = fs.readFileSync(
            "signup-customer-shop-createResponse.json",
            "utf-8"
        );
        const cre = JSON.parse(signUpCustomerPayload);
        const customer_email = cre?.customerSignUp?.customer?.email;
        const customer_id = Number(cre?.customerSignUp?.customer?.id);
        console.log(customer_id);

    test("returns the authenticated customer's profile", async () => {
        const client = new GraphQLCustomerClient();

        const res = await client.customerExecute(customerAccountInfoQuery, {}, { withAuth: true });

        expect(res.accountInfo).toBeTruthy();
        expect(res.accountInfo.id).toBe(customer_id.toString());
        expect(res.accountInfo.email).toBe(customer_email);

        const outPath = path.resolve(process.cwd(), "get-customer-profile-response.json");
        fs.writeFileSync(outPath, JSON.stringify(res, null, 2), "utf-8");
    });
});

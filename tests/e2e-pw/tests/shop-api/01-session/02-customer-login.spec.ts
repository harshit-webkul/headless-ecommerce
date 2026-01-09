import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../utils/customerApiClient";
import { customerSignInMutation } from "../../../mutations/shop-mutation/session-mutation/session-mutation";
import * as fs from "fs";

test.describe("Customer API Tests", () => {
    let apiClient: GraphQLCustomerClient;

    const signUpCustomerPayload = fs.readFileSync(
        "customer-payload-shop-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(signUpCustomerPayload);
    const customer_email = cre?.email;

    const customer_password = cre?.password;

    test.beforeAll(async () => {
        apiClient = new GraphQLCustomerClient(GraphQLCustomerClient.baseURL);
        await apiClient.customerLogin(customer_email, customer_password, true, "1233", "nokia");
    });

    test("Customer accessToken", async () => {
        expect(apiClient.getCustomerToken()).not.toBeNull();
    });
});

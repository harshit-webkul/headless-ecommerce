import { test, expect } from "@playwright/test";
import { getCampaignsQuery } from "../../../../../mutations/marketings/communications/campaigns-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";

test.describe("Get All Campaigns", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all campaigns", async () => {
        const response = await apiClient.execute(
            getCampaignsQuery,
            { first: 10, page: 1 },
            { withAuth: true }
        );

        console.log("Get All Campaigns Response:", response);

        expect(response.campaigns).not.toBeNull();
        expect(response.campaigns.data).toBeInstanceOf(Array);
    });
});

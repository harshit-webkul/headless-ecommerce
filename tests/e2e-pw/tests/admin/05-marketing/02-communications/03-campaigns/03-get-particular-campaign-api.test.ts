import { test, expect } from "@playwright/test";
import { getCampaignQuery } from "../../../../../mutations/marketings/communications/campaigns-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get Particular Campaign", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get particular campaign", async () => {
        const filePath = path.resolve(process.cwd(), "create-campaign-createResponse.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);

        const id = createResponse.createCampaign.campaign.id;

        const response = await apiClient.execute(
            getCampaignQuery,
            { id },
            true
        );

        console.log("Get Particular Campaign Response:", response);

        expect(response.campaign).not.toBeNull();
        expect(response.campaign.id).toEqual(id);
    });
});

import { test, expect } from "@playwright/test";
import { deleteCampaignMutation } from "../../../../../mutations/marketings/communications/campaigns-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Delete Campaign", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("delete campaign", async () => {
        const filePath = path.resolve(process.cwd(), "create-campaign-createResponse.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);

        const id = createResponse.createCampaign.campaign.id;

        const response = await apiClient.execute(
            deleteCampaignMutation,
            { id },
            { withAuth: true }
        );

        console.log("Delete Campaign Response:", response);

        expect(response.deleteCampaign.success).toBe(true);

        const row = await DBClient.getRow(
            "SELECT * FROM marketing_campaigns WHERE id = ?",
            [Number(id)]
        );

        expect(row).toBe(null);
    });
});

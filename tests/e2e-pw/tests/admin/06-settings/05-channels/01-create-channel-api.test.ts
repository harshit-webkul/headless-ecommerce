import { test, expect } from "@playwright/test";
import { createChannelMutation } from "../../../../mutations/settings/channels-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Channel", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const randomSuffix = Date.now();

    test("create channel", async () => {

        const createInput = {
            code: `CH${randomSuffix}`,
            name: `Channel ${randomSuffix}`,
            description: "Test channel",
            timezone: "Asia/Kolkata",
            theme: "default",
            hostname: `channel${randomSuffix}.test.com`,
            rootCategoryId: 1,
            defaultLocaleId: 1,
            baseCurrencyId: 1,
            isMaintenanceOn: false,
            allowedIps: [],
            maintenanceModeText: "Maintenance",
            homeSeo: {
                metaTitle: `Home${randomSuffix}`,
                metaKeywords: "test,channel",
                metaDescription: "Test Channel SEO"
            }
        };

        const response = await apiClient.execute(
            createChannelMutation,
            { input: createInput },
            true
        );

        console.log("Create Channel Response:", response);

        fs.writeFileSync(
            path.resolve(process.cwd(), "create-channel-response.json"),
            JSON.stringify(response, null, 2),
            "utf-8"
        );

        expect(response.createChannel.success).toBe(true);
        expect(response.createChannel.channel.code).toBe(createInput.code);
    });
});

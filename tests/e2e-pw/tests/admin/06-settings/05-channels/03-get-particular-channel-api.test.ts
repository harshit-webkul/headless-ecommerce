import { test, expect } from "@playwright/test";
import { getChannelQuery } from "../../../../mutations/settings/channels-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";

test.describe("Get Particular Channel", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-channel-response.json", "utf-8")
    );

    const channelId = Number(createResponse.createChannel.channel.id);

    test("get channel by id", async () => {

        const response = await apiClient.execute(
            getChannelQuery,
            { id: channelId },
            true
        );

        console.log("Get Particular Channel Response:", response);

        expect(response.channel.id).toBe(channelId.toString());
        expect(response.channel.code).toBeDefined();
    });
});

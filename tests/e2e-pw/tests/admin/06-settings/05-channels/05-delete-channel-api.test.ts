import { test, expect } from "@playwright/test";
import { deleteChannelMutation } from "../../../../mutations/settings/channels-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";

test.describe("Delete Channel", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createResponse = JSON.parse(
        fs.readFileSync("create-channel-response.json", "utf-8")
    );

    const channelId = Number(createResponse.createChannel.channel.id);

    test("delete channel", async () => {

        const response = await apiClient.execute(
            deleteChannelMutation,
            { id: channelId },
            { withAuth: true }
        );

        console.log("Delete Channel Response:", response);
        expect(response.deleteChannel.success).toBe(true);
    });
});

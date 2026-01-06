import { test, expect } from "@playwright/test";
import { getChannelsQuery } from "../../../../mutations/settings/channels-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";

test.describe("Get All Channels", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all channels", async () => {

        const response = await apiClient.execute(
            getChannelsQuery,
            {
                first: 10,
                page: 1,
                input: {}
            },
            true
        );

        console.log("Get All Channels Response:", response);

        expect(response.channels.data.length).toBeGreaterThan(0);
        expect(response.channels.paginatorInfo.total).toBeGreaterThan(0);

        /**
         * Get all channel total via database
         */
        const channelINID = await DBClient.getRow(
            "SELECT COUNT(*) AS total FROM channels"
        )

        const total_channel = channelINID.total;
        expect(response.channels.paginatorInfo.total).toEqual(total_channel)

    });
});

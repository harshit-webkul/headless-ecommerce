import { expect, test } from "@playwright/test";
import { getAllEventsMutation } from "../../../../../mutations/events-mutation/get-all-events-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All events via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All events via graphQL api", async () => {

        const getAllEventsCredentials = {
            first: "10",
            page: "1",
        };

        // const getParticularDetails = {
            //    id: 1
            //    name: "test"
        // }

        /**
         * Execute get all events
         */
        const getAllEventsResponse = await apiClient.execute(getAllEventsMutation, {
            getAllEventsCredentials},
            true
        );

        console.log("get all events Response:", getAllEventsResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-all-events-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllEventsResponse, null, 2),
            "utf-8"
        );

        expect(getAllEventsResponse.events.data.length).toBeGreaterThan(
            0
        );

        // /**
        //  * get the total data from marketing_templates table
        //  */
        // const eventsCount = await DBClient.getRow(
        // 'SELECT COUNT(*) AS total FROM marketing_events'
        // );

        // const total_events =  eventsCount.total;
        // console.log(total_events);
        // expect(getAllEventsResponse.events.paginatorInfo.total).toEqual(total_events);
    });
});

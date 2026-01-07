import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularEventMutation } from "../../../../../mutations/events-mutation/get-particular-event-api-mutation";

test.describe("get Particular event via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const updateEventResponse = fs.readFileSync(
        "update-event-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(updateEventResponse);
    console.log("update event Response Data:", cre);
    const event_id = Number(cre.updateEvent.event.id);
    console.log("update event ID :", event_id);
        
    

    test('get Particular event via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularEventCredentials = {
            id : event_id
        };

        /**
         * Execute get particular cart rule mutation
         */
        const getParticularEventResponse = await apiClient.execute(getParticularEventMutation, {
                id : getParticularEventCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular event Response:', getParticularEventResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-event-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularEventResponse, null, 2), "utf-8");

        expect(getParticularEventResponse.event.id).toEqual(cre.updateEvent.event.id);
        expect(getParticularEventResponse.event.name).toEqual(cre.updateEvent.event.name);
        expect(getParticularEventResponse.event.description).toEqual(cre.updateEvent.event.description);
        expect(getParticularEventResponse.event.date).toEqual(cre.updateEvent.event.date);
      });
});

import { expect, test } from "@playwright/test";
import {updateEventMutation} from "../../../../../mutations/events-mutation/update-event-api-mutation"
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update event via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tomorrowDate = tomorrow
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");

    console.log(tomorrowDate);

    const createEventResponse = fs.readFileSync(
            "create-event-createResponse.json",
            "utf-8"
        );
        const cre = JSON.parse(createEventResponse);
        console.log("Create event Response Data:", cre);
        const event_id = Number(cre.createEvent.event.id);
        console.log("create email template ID :", event_id);
    

    test('update event  graphQL api', async () => {
        const randomSuffix = Date.now();

        const updateEventCredentials = {
            name: `update-event${randomSuffix}`,
            description: `update-event-invitation${randomSuffix}`,
            date: tomorrowDate,
        };

        /**
         * Execute update event
         */
        const updateEventResponse = await apiClient.execute(updateEventMutation, {
            id: event_id,
            input: updateEventCredentials
        }, { withAuth: true });

        console.log('update event Response:', updateEventResponse);

        const filePath = path.resolve(process.cwd(), "update-event-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateEventResponse, null, 2), "utf-8");

        expect(updateEventResponse.updateEvent.success).toBe(true);
        expect(updateEventResponse.updateEvent.message).toContain('Event updated successfully.');
        expect(updateEventResponse.updateEvent.event.id).toEqual(cre.createEvent.event.id);
        expect(updateEventResponse.updateEvent.event.name).toEqual(updateEventCredentials.name);
        
      });
});

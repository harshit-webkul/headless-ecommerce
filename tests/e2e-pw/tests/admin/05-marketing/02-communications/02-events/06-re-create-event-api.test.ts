import { expect, test } from "@playwright/test";
import {createEventMutation} from "../../../../../mutations/events-mutation/create-event-api-mutation"
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create events via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create events  graphQL api', async () => {
        const randomSuffix = Date.now();

        const today = new Date().toLocaleDateString("en-GB").split("/").join("-");
        console.log(today);

        const createEventCredentials = {
            name: `Rock Show${randomSuffix}`,
            description: `Street Rock Show${randomSuffix}`,
            date: today,
        };

        /**
         * Execute create events execute
         */
        const createEventResponse = await apiClient.execute(createEventMutation, {
                input: createEventCredentials
        }, { withAuth: true });

        console.log('Create event Response:', createEventResponse);

        const filePath = path.resolve(process.cwd(), "create-event-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createEventResponse, null, 2), "utf-8");

        expect(createEventResponse.createEvent.success).toBe({ withAuth: true });
        expect(createEventResponse.createEvent.message).toContain('Event created successfully.');
        
        const create_event_ID = Number(createEventResponse.createEvent.event.id);

        console.log('Created event ID:', create_event_ID);

        /**
         * Verify database entry
         */
        const eventIDInDB = await DBClient.getRow(
            'SELECT * FROM marketing_events WHERE id = ?',
            [create_event_ID]
        );

        console.log('eventIDInDB in DB:', eventIDInDB);

        expect(eventIDInDB).not.toBeNull();
        expect(eventIDInDB?.name).toEqual(createEventResponse.createEvent.event.name);
        expect(eventIDInDB?.id).toEqual(create_event_ID);
      });
});

import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteEventMutation } from "../../../../../mutations/events-mutation/delete-event-api-mutation";

test.describe("delete event via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createEventResponse = fs.readFileSync(
        "create-event-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(createEventResponse);
    console.log("Create event Response Data:", cre);
    const event_id = Number(cre.createEvent.event.id);
    console.log("create email template ID :", event_id);
        

test('delete event via graphQL api', async () => {

        const deleteEventCredentials = {
            id : event_id,
        };
        
        /**
         * Execute delete event execution
         */
        const deleteEventResponse = await apiClient.execute(deleteEventMutation, {
                id: deleteEventCredentials.id
        }, { withAuth: true });

        console.log('delete email template Response:', deleteEventResponse);

        expect(deleteEventResponse.deleteEvent.success).toBe({ withAuth: true }); 
        expect(deleteEventResponse.deleteEvent.message).toContain('Event deleted successfully'); 
    });
});
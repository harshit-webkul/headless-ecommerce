import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { deleteSubscriberMutation as DELETE_SUBSCRIBER } from "../../../../../mutations/marketings/communications/subscribers-mutation";
import * as fs from "fs";
import path from "path";
import { DBClient } from "../../../../../utils/dbClient";

test.describe("Delete Subscriber API", () => {
    test("deletes the subscriber record", async () => {
        const filePath = path.resolve(process.cwd(), "create-subscriber-createResponse.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const saved = JSON.parse(raw);
        const id = saved.createSubscriber.subscriber.id;

        const client = new GraphQLClient();
        const res = await client.execute(DELETE_SUBSCRIBER, { id }, { withAuth: true });

        expect(res.deleteSubscriber).toBeTruthy();
        expect(res.deleteSubscriber.success).toBeTruthy();

        const row = await DBClient.getRow("SELECT * FROM subscribers_list WHERE id = ?", [id]);
        expect(row).toBeNull();
    });
});

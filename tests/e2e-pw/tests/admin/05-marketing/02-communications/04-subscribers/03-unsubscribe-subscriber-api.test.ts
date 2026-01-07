import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { unSubscriberMutation as UNSUBSCRIBE } from "../../../../../mutations/marketings/communications/subscribers-mutation";
import * as fs from "fs";
import path from "path";
import { DBClient } from "../../../../../utils/dbClient";

test.describe("Unsubscribe Subscriber API", () => {
    test("unsubscribes an existing subscriber", async () => {
        const filePath = path.resolve(process.cwd(), "create-subscriber-createResponse.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const saved = JSON.parse(raw);
        const subscriber = saved.createSubscriber.subscriber;
        const id = subscriber.id;
        const customerId = subscriber.customer_id ?? null;
        const idForMutation = customerId ?? id;

        const client = new GraphQLClient();
        const res = await client.execute(UNSUBSCRIBE, { id: idForMutation }, { withAuth: true });

        expect(res.unSubscribe).toBeTruthy();
        // mutation may return subscriber by id (subscriber id) or by customer id mapping
        expect(res.unSubscribe.subscriber).toBeTruthy();
        expect(res.unSubscribe.subscriber.isSubscribed).toBeFalsy();

        const where = customerId ? "customer_id = ?" : "id = ?";
        const whereVal = customerId ? customerId : id;
        const row = await DBClient.getRow(`SELECT * FROM subscribers_list WHERE ${where}`, [whereVal]);
        expect(row).not.toBeNull();
        expect(row?.is_subscribed).toEqual(0);
    });
});

import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { getSubscriberQuery as GET_SUBSCRIBER } from "../../../../../mutations/marketings/communications/subscribers-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Get Particular Subscriber API", () => {
    test("returns the subscriber by id", async () => {
        const filePath = path.resolve(process.cwd(), "create-subscriber-createResponse.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const saved = JSON.parse(raw);
        const id = saved.createSubscriber.subscriber.id;

        const client = new GraphQLClient();
        const res = await client.execute(GET_SUBSCRIBER, { id }, { withAuth: true });

        expect(res.getSubscriber).toBeTruthy();
        expect(res.getSubscriber.id).toEqual(id);
        expect(res.getSubscriber.email).toBeDefined();
    });
});

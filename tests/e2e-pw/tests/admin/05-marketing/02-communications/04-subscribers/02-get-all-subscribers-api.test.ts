import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import { getSubscribersQuery as GET_SUBSCRIBERS } from "../../../../../mutations/marketings/communications/subscribers-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Get All Subscribers API", () => {
    test("returns a list of subscribers including the created one", async () => {
        const filePath = path.resolve(process.cwd(), "create-subscriber-createResponse.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const saved = JSON.parse(raw);
        const id = saved.createSubscriber.subscriber.id;

        const client = new GraphQLClient();
        const res = await client.execute(GET_SUBSCRIBERS, { page: 1, limit: 20 }, { withAuth: true });

        expect(res.getSubscribers).toBeTruthy();
        expect(res.getSubscribers.data).toBeInstanceOf(Array);

        const found = res.getSubscribers.data.find((s: any) => s.id === id);
        expect(found).toBeTruthy();
    });
});

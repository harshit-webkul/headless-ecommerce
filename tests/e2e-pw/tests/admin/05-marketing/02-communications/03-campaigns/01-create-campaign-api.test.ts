import { test, expect } from "@playwright/test";
import { createCampaignMutation } from "../../../../../mutations/marketings/communications/campaigns-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create Campaign", () => {
    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const createEventResponse = fs.readFileSync(
        "create-event-createResponse.json",
        "utf-8"
    );
    const event = JSON.parse(createEventResponse);
    console.log("Create event Response Data:", event);
    const event_id = Number(event.createEvent.event.id);
    console.log("create email template ID :", event_id);

    const createCustomerGroupResponse = fs.readFileSync(
            "create-customer-group-createResponse.json",
            "utf-8"
        );
    const group_id = JSON.parse(createCustomerGroupResponse);
    console.log("Create customer group Response Data:", group_id);
    const customer_group_id = Number(group_id.createCustomerGroup.customerGroup.id);
    console.log("customer group ID to update:", customer_group_id);
        
    const createEmailTemplateResponse = fs.readFileSync(
        "create-email-template-createResponse.json",
        "utf-8"
    );
    const email_tem_id = JSON.parse(createEmailTemplateResponse);
    console.log("Create email template Response Data:", email_tem_id);
    const email_template_id = Number(email_tem_id.createEmailTemplate.emailTemplate.id);
    console.log("create email template ID :", email_template_id);

    test("create campaign", async () => {
        const randomSuffix = Date.now();

        // Pick a valid channel id from DB as fallback
        // const channelRow = await DBClient.getRow("SELECT id FROM channels LIMIT 1", []);
        // const channelId = channelRow ? Number(channelRow.id) : null;

        const createInput = {
            name: `New Campaign-${randomSuffix}`,
            subject: `New Campaign-Subject-${randomSuffix}`,
            eventId: event_id,
            emailTemplateId: email_template_id,
            channelId: 1,
            customerGroupId: customer_group_id,
            status: false,
        };

        const response = await apiClient.execute(
            createCampaignMutation,
            { input: createInput },
            true
        );

        console.log("Create Campaign Response:", response);

        const filePath = path.resolve(process.cwd(), "create-campaign-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");

        expect(response.createCampaign.success).toBe(true);
        expect(response.createCampaign.campaign.name).toEqual(createInput.name);

        const createdID = Number(response.createCampaign.campaign.id);

        const row = await DBClient.getRow(
            "SELECT * FROM marketing_campaigns WHERE id = ?",
            [createdID]
        );

        expect(row).not.toBeNull();
        expect(row?.name).toEqual(createInput.name);
    });
});

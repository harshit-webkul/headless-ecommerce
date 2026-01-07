import { test, expect } from "@playwright/test";
import { updateCampaignMutation } from "../../../../../mutations/marketings/communications/campaigns-mutation";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Update Campaign", () => {
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

    test("update campaign", async () => {
        const filePath = path.resolve(process.cwd(), "create-campaign-createResponse.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const createResponse = JSON.parse(raw);

        const id = createResponse.createCampaign.campaign.id;
        const randomSuffix = Date.now();

        const updateInput = {
            name: `New Campaign-${randomSuffix}`,
            subject: `New Campaign-Subject-${randomSuffix}`,
            eventId: event_id,
            emailTemplateId: email_template_id,
            channelId: 1,
            customerGroupId: customer_group_id,
            status: false,
        };

        const response = await apiClient.execute(
            updateCampaignMutation,
            { id, input: updateInput },
            { withAuth: true }
        );

        console.log("Update Campaign Response:", response);

        expect(response.updateCampaign.success).toBe({ withAuth: true });
        expect(response.updateCampaign.campaign.name).toEqual(updateInput.name);
    });
});

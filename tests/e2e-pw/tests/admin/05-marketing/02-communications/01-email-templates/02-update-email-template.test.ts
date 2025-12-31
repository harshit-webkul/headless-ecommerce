import { expect, test } from "@playwright/test";
import {updateEmailTemaplateMutation} from "../../../../../mutations/email-templates/update-email-template-api-mutation"
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create email template group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createEmailTemplateResponse = fs.readFileSync(
            "create-email-template-createResponse.json",
            "utf-8"
        );
        const cre = JSON.parse(createEmailTemplateResponse);
        console.log("Create email template Response Data:", cre);
        const email_template_id = Number(cre.createEmailTemplate.emailTemplate.id);
        console.log("create email template ID :", email_template_id);
    

    test('update email template  graphQL api', async () => {
        const randomSuffix = Date.now();

        const updateEmailTemplateCredentials = {
            name: `update-Birthday Greetings${randomSuffix}`,
            content: `update-Birthday Greetings Card${randomSuffix}`,
            status: "ACTIVE"
        };

        /**
         * Execute email template execute
         */
        const updateEmailTemplateResponse = await apiClient.execute(updateEmailTemaplateMutation, {
            id: email_template_id,
            input: updateEmailTemplateCredentials
        }, true);

        console.log('update email template Response:', updateEmailTemplateResponse);

        const filePath = path.resolve(process.cwd(), "update-email-template-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateEmailTemplateResponse, null, 2), "utf-8");

        expect(updateEmailTemplateResponse.updateEmailTemplate.success).toBe(true);
        expect(updateEmailTemplateResponse.updateEmailTemplate.message).toContain('Email Template updated successfully.');
        expect(updateEmailTemplateResponse.updateEmailTemplate.emailTemplate.id).toEqual(cre.createEmailTemplate.emailTemplate.id);
        
      });
});

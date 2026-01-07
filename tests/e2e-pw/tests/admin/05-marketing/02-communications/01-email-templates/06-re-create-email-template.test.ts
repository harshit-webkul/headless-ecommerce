import { expect, test } from "@playwright/test";
import {createEmailTemplateMutation} from "../../../../../mutations/email-templates/create-email-template-api-mutation"
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create email template group via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create email template  graphQL api', async () => {
        const randomSuffix = Date.now();

        const createEmailTemplateCredentials = {
            name: `Birthday Greetings${randomSuffix}`,
            content: `Birthday Greetings Card${randomSuffix}`,
            status: "INACTIVE"
    
        };

        /**
         * Execute email template execute
         */
        const createEmailTemplateResponse = await apiClient.execute(createEmailTemplateMutation, {
                input: createEmailTemplateCredentials
        }, { withAuth: true });

        console.log('Create email template Response:', createEmailTemplateResponse);

        const filePath = path.resolve(process.cwd(), "create-email-template-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createEmailTemplateResponse, null, 2), "utf-8");

        expect(createEmailTemplateResponse.createEmailTemplate.success).toBe({ withAuth: true });
        expect(createEmailTemplateResponse.createEmailTemplate.message).toContain('Email Template created successfully.');
        
        const create_email_template_ID = Number(createEmailTemplateResponse.createEmailTemplate.emailTemplate.id);

        console.log('Created customer group ID:', create_email_template_ID);

        /**
         * Verify database entry
         */
        const emailTemplateIDInDB = await DBClient.getRow(
            'SELECT * FROM marketing_templates WHERE id = ?',
            [create_email_template_ID]
        );

        console.log('email template in DB:', emailTemplateIDInDB);

        expect(emailTemplateIDInDB).not.toBeNull();
        expect(emailTemplateIDInDB?.name).toEqual(createEmailTemplateResponse.createEmailTemplate.emailTemplate.name);
      });
});

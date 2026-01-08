import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteEmailTemplateMutation } from "../../../../../mutations/email-templates/delete-email-template-api-mutation";

test.describe("delete email template via GraphQL API", () => {
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

test('delete email template via graphQL api', async () => {

        const deleteEmailTemplateCredentials = {
            id : email_template_id,
        };
        
        /**
         * Execute delete email template execution
         */
        const deleteEmailTemplateResponse = await apiClient.execute(deleteEmailTemplateMutation, {
                id: deleteEmailTemplateCredentials.id
        }, { withAuth: true });

        console.log('delete email template Response:', deleteEmailTemplateResponse);

        expect(deleteEmailTemplateResponse.deleteEmailTemplate.success).toBe(true); 
        expect(deleteEmailTemplateResponse.deleteEmailTemplate.message).toContain('Email Template deleted successfully'); 
    });
});
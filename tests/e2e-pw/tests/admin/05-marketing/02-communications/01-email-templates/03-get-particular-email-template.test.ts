import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularEmailTemplateMutation } from "../../../../../mutations/email-templates/get-particular-email-template-api-mutation";

test.describe("get Particular email template via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const updateEmailTemplateResponse = fs.readFileSync(
        "update-email-template-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(updateEmailTemplateResponse);
    console.log("update email template Response Data:", cre);
    const email_template_id = Number(cre.updateEmailTemplate.emailTemplate.id);
    console.log("update email template ID :", email_template_id);
        
    

    test('get Particular email template via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularEmailTemplateCredentials = {
            id : email_template_id
        };

        /**
         * Execute get particular cart rule mutation
         */
        const getParticularEmailTemplateResponse = await apiClient.execute(getParticularEmailTemplateMutation, {
                id : getParticularEmailTemplateCredentials.id,
        }, true);

        console.log('Get Particular email-template Response:', getParticularEmailTemplateResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-email-template-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularEmailTemplateResponse, null, 2), "utf-8");

        expect(getParticularEmailTemplateResponse.emailTemplate.id).toEqual(cre.updateEmailTemplate.emailTemplate.id);
        expect(getParticularEmailTemplateResponse.emailTemplate.name).toEqual(cre.updateEmailTemplate.emailTemplate.name);
      });
});

import { expect, test } from "@playwright/test";
import { getAllEmailTemplatesMutation } from "../../../../../mutations/email-templates/get-all-email-templates-api-mutation";
import { DBClient } from "../../../../../utils/dbClient";
import { GraphQLClient } from "../../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All email templates via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All email templates via graphQL api", async () => {

        const getAllEmailTemplatesCredentials = {
            first: "10",
            page: "1",
        };

        // const getParticularDetails = {
            //    id: 1
            //    name: "test"
        // }

        /**
         * Execute get all email templates execute
         */
        const getAllEmailTemplatesResponse = await apiClient.execute(getAllEmailTemplatesMutation, {
            getAllEmailTemplatesCredentials},
            { withAuth: true }
        );

        console.log("get all email templates Response:", getAllEmailTemplatesResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-all-email-templates-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllEmailTemplatesResponse, null, 2),
            "utf-8"
        );

        expect(getAllEmailTemplatesResponse.emailTemplates.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from marketing_templates table
         */
        const emailTemplateCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM marketing_templates'
        );

        const total_cart_rule =  emailTemplateCount.total;
        console.log(total_cart_rule);
        expect(getAllEmailTemplatesResponse.emailTemplates.paginatorInfo.total).toEqual(total_cart_rule);
    });
});

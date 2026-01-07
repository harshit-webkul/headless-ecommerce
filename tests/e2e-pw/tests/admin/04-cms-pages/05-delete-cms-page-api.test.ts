import { expect, test } from "@playwright/test";
import { DBClient } from "../../../utils/dbClient";
import { GraphQLClient } from "../../../utils/adminApiClient";
import * as fs from "fs";
import { deleteCMSpageMutation } from "../../../mutations/cms-pages/delete-cms-page-api-mutation";

test.describe("delete cms page via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCMSpageResponse = fs.readFileSync(
        "create-cms-page-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(createCMSpageResponse);
    console.log("Create cms page Response Data:", cre);
    const cmsPage_id = Number(cre.createCmsPage.page.id);
    console.log("cms page ID to update:", cmsPage_id);

test('delete cms page via graphQL api', async () => {

        const deleteCMSpageCredentials = {
            id : cmsPage_id,
        };
        
        /**
         * Execute delete cms page execution
         */
        const deleteCMSpageResponse = await apiClient.execute(deleteCMSpageMutation, {
                id: deleteCMSpageCredentials.id
        }, { withAuth: true });

        console.log('delete cms page Response:', deleteCMSpageResponse);

        expect(deleteCMSpageResponse.deleteCmsPage.success).toBe({ withAuth: true }); 
        expect(deleteCMSpageResponse.deleteCmsPage.message).toContain('CMS deleted successfully'); 
    });
});
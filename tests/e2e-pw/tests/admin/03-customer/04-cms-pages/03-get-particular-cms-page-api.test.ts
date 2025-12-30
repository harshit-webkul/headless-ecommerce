import { expect, test } from "@playwright/test";
import { DBClient } from "../../../utils/dbClient";
import { GraphQLClient } from "../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularCMSpageMutation } from "../../../mutations/cms-pages/get-cms-page-api-mutation";

test.describe("get Particular CMS page via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCMSpageResponse = fs.readFileSync(
        "create-cms-page-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(createCMSpageResponse);
    console.log("Create CMS page Response Data:", cre);
    const cmsPage_id = Number(cre.createCmsPage.page.id);
    console.log("CMS page ID to update:", cmsPage_id);

    test('get Particular CMS page via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularCMSpageCredentials = {
            id : cmsPage_id
        };

        /**
         * Execute get particular cms page execute
         */
        const getParticularCMSpageResponse = await apiClient.execute(getParticularCMSpageMutation, {
                id : getParticularCMSpageCredentials.id,
        }, true);

        console.log('Get Particular cms page Response:', getParticularCMSpageResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-cms-page-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularCMSpageResponse, null, 2), "utf-8");

        expect(getParticularCMSpageResponse.cmsPage.id).toEqual(cmsPage_id.toString());
        
      });
});

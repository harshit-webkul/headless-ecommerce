import { expect, test } from "@playwright/test";
import {createCmsPageMutation} from "../../../mutations/cms-pages/create-cms-page-api-mutation"
import { DBClient } from "../../../utils/dbClient";
import { GraphQLClient } from "../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create cms page via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create Customer group graphQL api', async () => {
        const randomSuffix = Date.now();

        const createCMSpageCredentials = {
            pageTitle: `cms-page${randomSuffix}`,
            channels: [1],
            htmlContent: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            metaTitle: `Why do we use it?${randomSuffix}`,
            urlKey: `cms-page${randomSuffix}`,
            metaKeywords: `Why do we use it?${randomSuffix}`,
            metaDescription: `Why do we use it?${randomSuffix}`,
        };

        /**
         * Execute create cms page execute
         */
        const createCMSpageResponse = await apiClient.execute(createCmsPageMutation, {
                input: createCMSpageCredentials
        }, { withAuth: true });

        console.log('Create cms page Response:', createCMSpageResponse);

        const filePath = path.resolve(process.cwd(), "create-cms-page-createResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(createCMSpageResponse, null, 2), "utf-8");

        expect(createCMSpageResponse.createCmsPage.success).toBe(true);
        expect(createCMSpageResponse.createCmsPage.message).toContain('CMS created successfully.');
        
        const create_cms_page_ID = Number(createCMSpageResponse.createCmsPage.page.id);

        console.log('Created cms page ID:', create_cms_page_ID);

        /**
         * Verify database entry
         */
        const cmsPageIDInDB = await DBClient.getRow(
            'SELECT * FROM cms_pages WHERE id = ?',
            [create_cms_page_ID]
        );

        console.log('cms_page in DB:', cmsPageIDInDB);

        expect(cmsPageIDInDB).not.toBeNull();
        expect(cmsPageIDInDB?.id).toEqual(create_cms_page_ID);


      });
});

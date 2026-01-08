import { expect, test } from "@playwright/test";
import { updateCMSpageMutation } from "../../../mutations/cms-pages/update-cms-page-api-mutation";
import { DBClient } from "../../../utils/dbClient";
import { GraphQLClient } from "../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update cms page details via GraphQL API", () => {
    test('update cms page details via graphQL api', async () => {
        const apiClient = new GraphQLClient(GraphQLClient.baseURL);

        const createCMSpageResponse = fs.readFileSync(
            "create-cms-page-createResponse.json",
            "utf-8"
        );
        const cre = JSON.parse(createCMSpageResponse);
        console.log("Create customer group Response Data:", cre);
        const cmsPage_id = Number(cre.createCmsPage.page.id);
        console.log("customer group ID to update:", cmsPage_id);
        const randomSuffix = Date.now();

        const updateCMSpageCredentials = {
            pageTitle: `Update Term & Condition${randomSuffix}`,
            channels: [1],
            htmlContent: "Update Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            metaTitle: `update Why do we use it?${randomSuffix}`,
            urlKey: `update-cms-page-${randomSuffix}`,
            metaKeywords: `update Why do we use it?${randomSuffix}`,
            metaDescription: `update Why do we use it?${randomSuffix}`,
        };

        /**
         * Execute create product mutation
         */
        const updateCMSpageResponse = await apiClient.execute(updateCMSpageMutation, {
                id : cmsPage_id,
                input: updateCMSpageCredentials,
        }, { withAuth: true });

        console.log('Update cms page Response:', updateCMSpageResponse);

        const filePath = path.resolve(process.cwd(), "update-cms-page-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateCMSpageResponse, null, 2), "utf-8");

        expect(updateCMSpageResponse.updateCmsPage.success).toBe(true);
        expect(updateCMSpageResponse.updateCmsPage.message).toContain('CMS updated successfully.');
        expect(updateCMSpageResponse.updateCmsPage.page.id).toEqual(cre.createCmsPage.page.id);
        
        const translations = updateCMSpageResponse.updateCmsPage.page.translations;
        const enLocalData =  translations.find((item: any) => item.locale === "en");
        console.log("udpate cms page url: ",updateCMSpageResponse.updateCmsPage.page.translations[0].urlKey);

        expect(enLocalData.urlKey).toEqual(updateCMSpageCredentials.urlKey);
        expect(enLocalData.pageTitle).toEqual(updateCMSpageCredentials.pageTitle);
        expect(enLocalData.metaTitle).toEqual(updateCMSpageCredentials.metaTitle);
        expect(enLocalData.metaDescription).toEqual(updateCMSpageCredentials.metaDescription);
        expect(enLocalData.metaKeywords).toEqual(updateCMSpageCredentials.metaKeywords);
        expect(enLocalData.htmlContent).toEqual(updateCMSpageCredentials.htmlContent);


    });
});

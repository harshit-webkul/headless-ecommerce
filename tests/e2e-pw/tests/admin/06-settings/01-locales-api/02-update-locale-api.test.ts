import { expect, test } from "@playwright/test";
import { updateLocaleMutation } from "../../../../mutations/settings/locales-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update locales details via GraphQL API", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createLocalesResponse = fs.readFileSync(
        "create-locale-createResponse.json",
        "utf-8"
    );
    const cre = JSON.parse(createLocalesResponse);
    console.log("create-locale Response Data:", cre);
    const locale_id = Number(cre.createLocale.locale.id);
    console.log("create-locale ID to update:", locale_id);
    const randomSuffix = Date.now();
    
    test('update locales details via graphQL api', async () => {

        const updateLocalesCredentials = {
            code: `ar${randomSuffix}`,
            name: `Arabic_${randomSuffix}`,
            direction: "RTL",
    	    image: "https://via.placeholder.com/300/09f/fff.png",
        };

        /**
         * Execute update locales mutation
         */
        const updateLocaleResponse = await apiClient.execute(updateLocaleMutation, {
                id : locale_id,
                input: updateLocalesCredentials,
        }, { withAuth: true });

        console.log('update locales Response:', updateLocaleResponse);

        const filePath = path.resolve(process.cwd(), "update-locale-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateLocaleResponse, null, 2), "utf-8");

        expect(updateLocaleResponse.updateLocale.success).toBe(true);
        expect(updateLocaleResponse.updateLocale.message).toContain('Locale updated successfully.');
        expect(updateLocaleResponse.updateLocale.locale.id).toEqual(cre.createLocale.locale.id);
        
    });
});

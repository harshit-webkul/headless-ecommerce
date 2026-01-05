// tests/settings/locales/create-locale.spec.ts

import { expect, test } from "@playwright/test";
import { createLocaleMutation } from "../../../../mutations/settings/locales-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("create locale via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);


    test("create locale graphQL api", async () => {
        const randomSuffix = Date.now();

        const createLocaleCredentials = {
            code: `loc_${randomSuffix}`,
            name: `Test Locale ${randomSuffix}`,
            direction: "LTR",
            image: "https://via.placeholder.com/300/09f/fff.png"
        };

        /**
         * Execute create Locale
         */
        const createLocaleResponse = await apiClient.execute(
            createLocaleMutation,
            {
                input: createLocaleCredentials,
            },
            true
        );

        console.log("Create Locale Response:", createLocaleResponse);

        const filePath = path.resolve(
            process.cwd(),
            "create-locale-createResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(createLocaleResponse, null, 2),
            "utf-8"
        );

        expect(createLocaleResponse.createLocale.success).toBe(true);
        expect(createLocaleResponse.createLocale.message).toContain(
            "Locale created successfully"
        );
        expect(createLocaleResponse.createLocale.locale.code).toEqual(createLocaleCredentials.code);
        expect(createLocaleResponse.createLocale.locale.name).toEqual(createLocaleCredentials.name);

        const create_locale_ID = Number(
            createLocaleResponse.createLocale.locale.id
        );

        console.log("Created Locale ID:", create_locale_ID);

        /**
         * Verify database entry
         */
        const localeIDInDB = await DBClient.getRow(
            "SELECT * FROM locales WHERE id = ?",
            [create_locale_ID]
        );

        console.log("localeIDInDB in DB:", localeIDInDB);

        expect(localeIDInDB).not.toBeNull();
        expect(localeIDInDB?.name).toEqual(
            createLocaleResponse.createLocale.locale.name
        );
        expect(localeIDInDB?.code).toEqual(
            createLocaleResponse.createLocale.locale.code
        );
        expect(localeIDInDB?.id).toEqual(create_locale_ID);
    });

});
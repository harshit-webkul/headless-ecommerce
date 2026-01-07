import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularLocaleQuery } from "../../../../mutations/settings/locales-mutation";

test.describe("get Particular Locale via GraphQL API", () => {
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

    test('get Particular Locale rule via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularLocaleCredentials = {
            id : locale_id
        };

        /**
         * Execute get particular Locale
         */
        const getParticularLocaleResponse = await apiClient.execute(getParticularLocaleQuery, {
                id : getParticularLocaleCredentials.id,
        }, { withAuth: true });

        console.log('Get Particular locale Response:', getParticularLocaleResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-locale-response.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularLocaleResponse, null, 2), "utf-8");

        expect(getParticularLocaleResponse.locale.id).toEqual(locale_id.toString());
        expect(getParticularLocaleResponse.locale.name).not.toEqual(cre.createLocale.locale.name);
        expect(getParticularLocaleResponse.locale.name).not.toEqual(cre.createLocale.locale.code);
        
      });
});

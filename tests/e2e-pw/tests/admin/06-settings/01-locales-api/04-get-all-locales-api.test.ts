// tests/settings/locales/get-all-locales.spec.ts

import { expect, test } from "@playwright/test";
import { getAllLocalesQuery } from "../../../../mutations/settings/locales-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("get all locales via GraphQL API", () => {
    let apiClient: GraphQLClient;

    test.beforeAll(async () => {
        apiClient = new GraphQLClient(GraphQLClient.baseURL);
    });

    test("get all locales graphQL api", async () => {
        /**
         * Execute get all Locales query
         */
        const getAllLocalesResponse = await apiClient.execute(
            getAllLocalesQuery,
            {
                first: 10,
                page: 1,
                input: {}
            },
            true
        );

        console.log("Get All Locales Response:", getAllLocalesResponse);

        const filePath = path.resolve(
            process.cwd(),
            "get-all-locales-response.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllLocalesResponse, null, 2),
            "utf-8"
        );

        // Verify response structure
        expect(getAllLocalesResponse.locales).toBeDefined();
        expect(getAllLocalesResponse.locales.paginatorInfo).toBeDefined();
        expect(getAllLocalesResponse.locales.data).toBeDefined();
        expect(Array.isArray(getAllLocalesResponse.locales.data)).toBe(true);

        // Verify paginator info
        const paginatorInfo = getAllLocalesResponse.locales.paginatorInfo;
        expect(paginatorInfo.count).toBeGreaterThanOrEqual(0);
        expect(paginatorInfo.currentPage).toBe(1);
        expect(paginatorInfo.total).toBeGreaterThanOrEqual(0);

        console.log("Total Locales:", paginatorInfo.total);
        console.log("Locales on Current Page:", paginatorInfo.count);

        // If there are locales, verify the data structure
        if (getAllLocalesResponse.locales.data.length > 0) {
            const firstLocale = getAllLocalesResponse.locales.data[0];
            
            expect(firstLocale.id).toBeDefined();
            expect(firstLocale.code).toBeDefined();
            expect(firstLocale.name).toBeDefined();
            expect(firstLocale.direction).toBeDefined();
            expect(firstLocale.createdAt).toBeDefined();
            expect(firstLocale.updatedAt).toBeDefined();

            console.log("First Locale:", firstLocale);

            /**
             * Verify database entry for first locale
             */
            const localeIDInDB = await DBClient.getRow(
                "SELECT * FROM locales WHERE id = ?",
                [firstLocale.id]
            );

            console.log("First Locale in DB:", localeIDInDB);

            expect(localeIDInDB).not.toBeNull();
            expect(localeIDInDB?.id).toEqual(Number(firstLocale.id));
            expect(localeIDInDB?.code).toEqual(firstLocale.code);
            expect(localeIDInDB?.name).toEqual(firstLocale.name);
        }
    });

    test("get all locales with filters graphQL api", async () => {
        // Read created locale from previous test
        const createLocaleResponse = fs.readFileSync(
            "create-locale-createResponse.json",
            "utf-8"
        );
        const locale = JSON.parse(createLocaleResponse);
        const locale_code = locale.createLocale.locale.code;
        
        console.log("Filtering by Locale Code:", locale_code);

        /**
         * Execute get all Locales query with filter
         */
        const getAllLocalesResponse = await apiClient.execute(
            getAllLocalesQuery,
            {
                first: 10,
                page: 1,
                input: {
                    code: locale_code
                }
            },
            true
        );

        console.log("Get All Locales with Filter Response:", getAllLocalesResponse);

        // Verify filtered results
        expect(getAllLocalesResponse.locales).toBeDefined();
        expect(getAllLocalesResponse.locales.data).toBeDefined();
        expect(Array.isArray(getAllLocalesResponse.locales.data)).toBe(true);
        
        // Should have at least one result matching the filter
        expect(getAllLocalesResponse.locales.data.length).toBeGreaterThanOrEqual(1);
        
        // Verify the filtered locale matches
        const filteredLocale = getAllLocalesResponse.locales.data.find(
            (loc: any) => loc.code === locale_code
        );
        
        expect(filteredLocale).toBeDefined();
        expect(filteredLocale.code).toBe(locale_code);
        
        console.log("Filtered Locale:", filteredLocale);
    });

    test("get all locales with pagination graphQL api", async () => {
        /**
         * Execute get all Locales query with pagination
         */
        const getAllLocalesPageOneResponse = await apiClient.execute(
            getAllLocalesQuery,
            {
                first: 5,
                page: 1,
                input: {}
            },
            true
        );

        console.log("Get All Locales Page 1 Response:", getAllLocalesPageOneResponse);

        // Verify pagination
        const paginatorInfo = getAllLocalesPageOneResponse.locales.paginatorInfo;
        expect(paginatorInfo.currentPage).toBe(1);
        expect(paginatorInfo.count).toBeLessThanOrEqual(5);

        // If there are more pages, test page 2
        if (paginatorInfo.lastPage > 1) {
            const getAllLocalesPageTwoResponse = await apiClient.execute(
                getAllLocalesQuery,
                {
                    first: 5,
                    page: 2,
                    input: {}
                },
                true
            );

            console.log("Get All Locales Page 2 Response:", getAllLocalesPageTwoResponse);

            const paginatorInfoPage2 = getAllLocalesPageTwoResponse.locales.paginatorInfo;
            expect(paginatorInfoPage2.currentPage).toBe(2);
        }
    });
});
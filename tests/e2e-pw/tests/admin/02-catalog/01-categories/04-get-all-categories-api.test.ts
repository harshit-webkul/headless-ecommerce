import { expect, test } from "@playwright/test";
import { getCategoriesMutation } from "../../../../mutations/categories/get-all-categories-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All catogories via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All catogories via graphQL api", async () => {
        const randomSuffix = Date.now();

        const getAllcategoriesCredentials = {
            slug: "root",
            // type: "simple",
            // sku: "simple",
            // name: "Booking",
            // attributeFamily: 1,
            // channel: "default",
        };

        /**
         * Execute create product mutation
         */
        const getAllCategoriesResponse = await apiClient.execute(
            getCategoriesMutation,
            {
                slug: getAllcategoriesCredentials.slug,
            },
            { withAuth: true }
        );

        console.log("get all products Response:", getAllCategoriesResponse);
        console.log(
            "get all products Response Data:",
            getAllCategoriesResponse.categories.data[0]
        );

        const filePath = path.resolve(
            process.cwd(),
            "get-all-categories-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllCategoriesResponse, null, 2),
            "utf-8"
        );

        expect(getAllCategoriesResponse.categories.data.length).toBeGreaterThan(
            0
        );
        expect(getAllCategoriesResponse.categories.data[0]).toHaveProperty(
            "id"
        );
    });
});

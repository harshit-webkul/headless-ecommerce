import { expect, test } from "@playwright/test";
import { updateCategoryMutation } from "../../../../mutations//categories/update-category-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { getParticularCategoryMutation } from "../../../../mutations/categories/get-particular-category-api-mutation";

test.describe("get Particular category via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCategoryResponse = fs.readFileSync(
            "create-category-createResponse.json",
            "utf-8"
        );

    const cre = JSON.parse(createCategoryResponse)
    console.log("Create Category Response Data:", cre);
    const category_id = Number(cre.createCategory.category.id);
    console.log("Category ID to update:", category_id);

    test('get Particular category via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getParticularCategoryCredentials = {
            id : category_id
        };

        /**
         * Execute get particular category mutation
         */
        const getParticularCategoryResponse = await apiClient.execute(getParticularCategoryMutation, {
                id : getParticularCategoryCredentials.id,
        }, true);

        console.log('Get Particular Category Response:', getParticularCategoryResponse);
        
        const filePath = path.resolve(process.cwd(), "get-particular-category-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(getParticularCategoryResponse, null, 2), "utf-8");

        expect(getParticularCategoryResponse.category.id).toEqual(category_id.toString());
        
      });
});

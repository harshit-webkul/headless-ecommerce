import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { deleteParticularCategoryMutation } from "../../../../mutations/categories/remove-category-mutation";

test.describe("Remove categories via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
test('Remove Particular category via graphQL api', async () => {
        const getAllCategoryResponse = fs.readFileSync(
            "get-all-categories-createResponse.json",
            "utf-8"
        );
        const category_id =  JSON.parse(getAllCategoryResponse).categories.data[0].children[0].id;
        console.log("Category ID for Particular Category Test:", category_id);

        const deleteParticularCategoryCredentials = {
            id: category_id,
        };

        /**
         * Execute delete category mutation
         */
        const deleteResponse = await apiClient.execute(deleteParticularCategoryMutation, {
                id: deleteParticularCategoryCredentials.id
        }, true);

        console.log('delete Response:', deleteResponse);

        expect(deleteResponse.deleteCategory.success).toBe(true);
        expect(deleteResponse.deleteCategory.message).toContain('Category deleted successfully');
        
    });
});
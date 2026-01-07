import { expect, test } from "@playwright/test";
import { deleteParticularProductMutation } from "../../../../mutations/remove-product-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Remove Products via GraphQL API", () => {
     let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
test('Remove Particular Products via graphQL api', async () => {
        const createProductResponse = fs.readFileSync(
                "vendor/bagisto/graphql-api/tests/e2e-pw/get-all-products-createResponse.json",
                "utf-8"
            );
        const product_id =  JSON.parse(createProductResponse).products.data[0].id;
        console.log("Product ID for Particular Product Test:", product_id);

        // console.log("Product ID for Particular Product Test:", product_id);

        const deleteParticularProductsCredentials = {
            id: product_id,
        };

        /**
         * Execute create product mutation
         */
        const deleteResponse = await apiClient.execute(deleteParticularProductMutation, {
                id: deleteParticularProductsCredentials.id
        }, { withAuth: true });

        console.log('get all products Response:', deleteResponse);
        // console.log('get all products Response Data:', createResponse.data.products.id);

        // const filePath = path.resolve(process.cwd(), "delete-particular-products-Response.json");
        // fs.writeFileSync(filePath, JSON.stringify(deleteResponse, null, 2), "utf-8");

        expect(deleteResponse.deleteProduct.success).toBe({ withAuth: true });
        expect(deleteResponse.deleteProduct.message).toContain('Product deleted successfully');
        
    });
});
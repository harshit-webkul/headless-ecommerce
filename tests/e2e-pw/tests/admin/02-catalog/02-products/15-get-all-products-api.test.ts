import { expect, test } from "@playwright/test";
import { getParticularProductMutation, getProductsMutation } from "../../../../mutations/get-products-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All Products via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('All Products via graphQL api', async () => {
        const randomSuffix = Date.now();

        const getAllProductsCredentials = {
            page: 1,
            limit: 12,
            // productId: 6,
            // type: "simple",
            // sku: "simple",
            // name: "Booking",
            // attributeFamily: 1,
            // channel: "default",
        };

        /**
         * Execute create product mutation
         */
        const createResponse = await apiClient.execute(getProductsMutation, {
                input: getAllProductsCredentials
        }, true);

        console.log('get all products Response:', createResponse);
        console.log('get all products Response Data:', createResponse.products.data[0]);

        const filePath = path.resolve(process.cwd(), "get-all-products-createResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

        expect(createResponse.products.paginatorInfo.count).toEqual(getAllProductsCredentials.limit);
        
      });


    test('Get Particular Products via graphQL api', async () => {


        const createProductResponse = fs.readFileSync(
                "get-all-products-createResponse.json",
                "utf-8"
            );
        const product_id =  JSON.parse(createProductResponse).products.data[0].id;

        // console.log("Product ID for Particular Product Test:", product_id);

        const getParticularProductsCredentials = {
            id: product_id,
        };

        /**
         * Execute create product mutation
         */
        const createResponse = await apiClient.execute(getParticularProductMutation, {
                id: getParticularProductsCredentials.id
        }, true);

        console.log('get all products Response:', createResponse);
        // console.log('get all products Response Data:', createResponse.data.products.id);

        const filePath = path.resolve(process.cwd(), "get-particular-products-Response.json");
        fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

        expect(createResponse.product.id).toEqual(getParticularProductsCredentials.id);
        
    });
});

import { expect, test } from "@playwright/test";
import { createBookingProductMutation } from "../../../../mutations/booking-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";


test.describe("create booking product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);


for (let i = 0; i < 6; i++) {
    test(`create product${i} via graphQL api`, async () => {
        const randomSuffix = Date.now();

        const createBookingProductCredentials = {
            type: "booking",
            attributeFamilyId: 1,
            sku: `booking-product-${randomSuffix}`
        };

        /**
         * Execute create product mutation
         */
        const createBookingResponse = await apiClient.execute(createBookingProductMutation, {
                input: createBookingProductCredentials
        }, { withAuth: true });

        console.log('Create booking Product Response:', createBookingResponse);
        const filePath = path.resolve(process.cwd(), `create-booking-product${i}-createResponse.json`);

        fs.writeFileSync(filePath, JSON.stringify(createBookingResponse, null, 2), "utf-8");

        expect(createBookingResponse.createProduct.success).toBe(true);
        expect(createBookingResponse.createProduct.message).toContain('Product created successfully.');
        expect(createBookingResponse.createProduct.product).toHaveProperty('id');
        expect(createBookingResponse.createProduct.product.sku).toEqual(createBookingProductCredentials.sku);
        expect(createBookingResponse.createProduct.product.type).toEqual(createBookingProductCredentials.type);
        expect(createBookingResponse.createProduct.product.attributeFamilyId).toEqual(createBookingProductCredentials.attributeFamilyId.toString());

        const createdBookingProductId = createBookingResponse.createProduct.product.id;

        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            'SELECT * FROM products WHERE id = ?',
            [createdBookingProductId]
        );

        console.log('Product in DB:', productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.sku).toEqual(createBookingProductCredentials.sku);
        expect(productInDB?.type).toEqual(createBookingProductCredentials.type);
        expect(productInDB?.attribute_family_id).toEqual(createBookingProductCredentials.attributeFamilyId);

      });
    }
});


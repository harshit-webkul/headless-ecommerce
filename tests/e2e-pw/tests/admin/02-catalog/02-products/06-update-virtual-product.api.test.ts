import { expect, test } from "@playwright/test";
import { updateVirtualProductMutation } from "../../../../mutations/virtual-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update configurable product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createVirtualProductResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-virtual-product-createResponse.json",
        "utf-8"
    );
    console.log("Create Product Response from file:", createVirtualProductResponse);
    const create_virtual_product_SKU = JSON.parse(createVirtualProductResponse).createProduct.product.sku;
    const create_virtual_product_id = JSON.parse(createVirtualProductResponse).createProduct.product.id;

    test("update config product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateVirtualProductDetails = {
            channel: "default",
            locale: "en",
            sku: `virtual-demo-updated-${randomSuffix}`,
            productNumber: `${randomSuffix}`,
            name: `virtual-demo-updated-${randomSuffix}`,
            urlKey: `virtual-demo-updated-${randomSuffix}`,
            taxCategoryId: 0,
            new: false,
            featured: true,
            visibleIndividually: true,
            status: true,
            guestCheckout: true,
            color: null,
            size: null,
            shortDescription: "Home Decor Short Description",
            description: "Home Decor Description",
            metaTitle: "Home Decor Meta Title",
            metaKeywords: "Home Decor Meta Keywords",
            metaDescription: "Home Decor Meta Description",
            price: 12.55,
            weight:0,
            cost: 0,
            specialPrice: 11.30,
            specialPriceFrom: "2021-02-08",
            specialPriceTo: "2021-02-28",
            customerGroupPrices: [{
                customerGroupId: null,
                qty: 2,
                valueType: "fixed",
                value: 5,
            }],
            inventories: [{
            	inventorySourceId: 1,
              	qty: 111,
            }],
            categories: [1],
            channels: [1],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [],
    
        };

        const cre = JSON.parse(createVirtualProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        console.log(
  "Update Virtual Product Mutation:",
  updateVirtualProductMutation
);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateVirtualProductMutation,
            {
                id: product_id,
                input: updateVirtualProductDetails,
            },
            true
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-virtual-product-updateResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(updateResponse, null, 2),
            "utf-8"
        );

        expect(updateResponse.updateProduct.success).toBe(true);
        expect(updateResponse.updateProduct.message).toContain(
            "Product updated successfully."
        );
        expect(updateResponse.updateProduct.product).toHaveProperty("id");
        // expect(updateResponse.updateProduct.product.sku).toBe(
        //     createConfigProductResponse.sku
        // );

        // expect(cre.createProduct.product.name).not.toEqual(
        //     createConfigProductResponse.name
        // );

        // expect(cre.createProduct.product.sku).not.toEqual(
        //     createConfigProductResponse.sku
        // );

        // const createdProductId = cre.createProduct.product.id;

        /**
         * Verify database entry
         */
        // const productInDB = await DBClient.getRow(
        //     "SELECT * FROM products WHERE id = ?",
        //     [createdProductId]
        // );

        // console.log("Product in DB:", productInDB);

        // expect(productInDB).not.toBeNull();
        // expect(productInDB?.sku).toBe(updateProductDetails.sku);
    });
});

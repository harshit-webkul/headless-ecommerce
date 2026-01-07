import { expect, test } from "@playwright/test";
import { updateCustomizableProductMutation } from "../../../../mutations/simple-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update configurable product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createGroupProductResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-group-product-createResponse.json",
        "utf-8"
    );

    const createSimpleProductResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-product-createResponse.json",
        "utf-8"
    );

    console.log("Create Product Response from file:", createGroupProductResponse);
    const create_group_product_SKU = JSON.parse(createGroupProductResponse).createProduct.product.sku;
    const create_group_product_id = JSON.parse(createGroupProductResponse).createProduct.product.id;

    const create_simple_product_id = JSON.parse(createSimpleProductResponse).createProduct.product.id;

    // const variant_product_id1 = JSON.parse(createGroupProductResponse).createProduct.product.variants[0].id;
    // const variant_product_id2 = JSON.parse(createGroupProductResponse).createProduct.product.variants[1].id;


    test("update group product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateGroupProductDetails = {
            channel: "default",
            locale: "en",
            sku:   `phone-accessories-${randomSuffix}-updated`,
            name: `phone-accessories-${randomSuffix}`,
            urlKey: `phone-accessories-${randomSuffix}`,
            productNumber:`789456123${randomSuffix}`,
            taxCategoryId: 1,
            new: { withAuth: true },
            featured: { withAuth: true },
            visibleIndividually: { withAuth: true },
            status: { withAuth: true },
            guestCheckout: { withAuth: true },
            color: 3,
            size: 9,
            shortDescription: "<p>Home Decor Short Description</p>",
            description: "<p>Home Decor Description</p>",
            metaTitle: "Home Decor Meta Title",
            metaKeywords: "Home Decor Meta Keywords",
            metaDescription: "Home Decor Meta Description",
            price: 0,
            weight:0,
            links: [{
                associatedProductId: create_simple_product_id,
                qty: 10,
                sortOrder: 1,
            }],
            categories: [1],
            channels: [1],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [],
        };

        const cre = JSON.parse(createGroupProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateCustomizableProductMutation,
            {
                id: product_id,
                input: updateGroupProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-group-product-Response.json"
        );
        fs.writeFileSync(
            filePath,
            JSON.stringify(updateResponse, null, 2),
            "utf-8"
        );

        expect(updateResponse.updateProduct.success).toBe({ withAuth: true });
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

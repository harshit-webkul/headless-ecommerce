import { expect, test } from "@playwright/test";
import { updateCustomizableProductMutation } from "../../../../mutations/simple-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update configurable product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createConfigProductResponse = fs.readFileSync(
        "create-config-product-response.json",
        "utf-8"
    );
    console.log("Create Product Response from file:", createConfigProductResponse);
    const create_config_product_SKU = JSON.parse(createConfigProductResponse).createProduct.product.sku;
    const create_config_product_id = JSON.parse(createConfigProductResponse).createProduct.product.id;

    const variant_product_id1 = JSON.parse(createConfigProductResponse).createProduct.product.variants[0].id;
    const variant_product_id2 = JSON.parse(createConfigProductResponse).createProduct.product.variants[1].id;


    test("update config product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateConfigProductDetails = {
            channel: "default",
            locale: "en",
            sku: `home-decor${randomSuffix}-updated`,
            name: "Home Decor-2",
            urlKey: `home-decor-2222${randomSuffix}`,
            productNumber: `4561564${randomSuffix}`,
            taxCategoryId: "",
            new: true,
            featured: true,
            visibleIndividually: true,
            status: true,
            guestCheckout: true,
            color: null,
            size: null,
            shortDescription: "dfdsfsdfdsfiption",
            description: "Home sdfsdf Description",
            metaTitle: "Home Decor Meta Title",
            metaKeywords: "Home Decor Meta Keywords",
            metaDescription: "Home Decor Meta Description",
            price: 0,
            weight: 0,
            inventories: [
                {
                    inventorySourceId: 1,
                    qty: 0,
                },
            ],
            categories: [],
            channels: [],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [],
            videos: [],
            // # variants index passed only in case of configurable type product
            variants: [
                {
                    variantId: Number(variant_product_id1),
                    sku: `home-decor-1-variant-2-6${randomSuffix}-updated`,
                    name: "Variant 1 6",
                    color: 4,
                    size: 6,
                    inventories: [
                        {
                            inventorySourceId: 1,
                            qty: 10,
                        },
                    ],
                    price: 10.0,
                    weight: 1,
                    status: true,
                    images: [],
                },
                {
                    variantId: Number(variant_product_id2),
                    sku: `home-decor-1-variant-2-6${randomSuffix}`,
                    name: "Variant 2 6",
                    color: 5,
                    size: 6,
                    inventories: [
                        {
                            inventorySourceId: 1,
                            qty: 30,
                        },
                    ],
                    price: 7.5,
                    weight: 1.45,
                    status: true,
                    images: [],
                },
            ],
        };

        const cre = JSON.parse(createConfigProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateCustomizableProductMutation,
            {
                id: product_id,
                input: updateConfigProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "create-product-updateResponse.json"
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

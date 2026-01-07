import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { updateDownloadableProductMutation } from "../../../../mutations/downloadable-product-api-mutation";

test.describe("update configurable product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createDownloadableProductResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-downloadable-product-createResponse.json",
        "utf-8"
    );

    console.log(
        "Create Product Response from file:",
        createDownloadableProductResponse
    );
    const create_downloadable_product_SKU = JSON.parse(
        createDownloadableProductResponse
    ).createProduct.product.sku;
    const create_downloadable_product_id = JSON.parse(
        createDownloadableProductResponse
    ).createProduct.product.id;

    // const variant_product_id1 = JSON.parse(createGroupProductResponse).createProduct.product.variants[0].id;
    // const variant_product_id2 = JSON.parse(createGroupProductResponse).createProduct.product.variants[1].id;

    test("update downloadable product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateDownloadableProductDetails = {
            channel: "default",
            locale: "en",
            sku: `e-book-${randomSuffix}`,
            name: `e-book-${randomSuffix}`,
            urlKey: `e-book-${randomSuffix}`,
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
            price: 12.55,
            cost: null,
            specialPrice: null,
            specialPriceFrom: "",
            specialPriceTo: "",
            width: 30,
            height: 24,
            depth: 11,
            weight: 5.2,
            // customerGroupPrices: [{
            // customerGroupId: 2,
            // qty: 2,
            // valueType: "fixed",
            // value: 10,
            // },	{
            // customerGroupId: 3,
            // qty: 3,
            // valueType: "discount",
            // value: 2,
            // }],
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
            downloadableLinks: [
                {
                    // #linkProductId: 9,
                    locales: [{
                        code: "en",
                        title: "Link 1",
                    }],
                    price: 2,
                    type: "url",
                    url: "https://cdn.pixabay.com/photo",
                    sampleType: "url",
                    sampleUrl: "",
                    downloads: 5,
                    sortOrder: 0,
                },
                // {
                //     // #linkProductId: 10,
                //     locales: {
                //         code: "en",
                //         title: "Link 2",
                //     },
                //     price: 4,
                //     type: "url",
                //     url: "https://cdn.pixabay.com/",
                //     sampleType: "url",
                //     sampleUrl: "",
                //     downloads: 8,
                //     sortOrder: 1,
                // },
                // {
                //     // #linkProductId: 11,
                //     locales: {
                //         code: "en",
                //         title: "Link 3",
                //     },
                //     price: 6,
                //     type: "url",
                //     url: "https://cdn.pixabay.com/",
                //     sampleType: "url",
                //     sampleUrl: "",
                //     downloads: 3,
                //     sortOrder: 2,
                // },
            ],
            downloadableSamples: [
                {
                    // #sampleProductId: 5,
                    locales: [{
                        code: "en",
                        title: "Sample 1",
                    }],
                    type: "url",
                    url: "http://192.168.15.80/github/bagisto-graphql/public/",
                    sortOrder: 0,
                },
            ],
        };

        const cre = JSON.parse(createDownloadableProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateDownloadableProductMutation,
            {
                id: product_id,
                input: updateDownloadableProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-downloadable-product-Response.json"
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
        expect(cre.createProduct.product.sku).not.toEqual(
            updateDownloadableProductDetails.sku
        );

        expect(cre.createProduct.product.name).not.toEqual(
            updateDownloadableProductDetails.name
        );

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

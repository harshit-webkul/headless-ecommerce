import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { updateBundleProductMutation } from "../../../../mutations/bundle-product-api-mutation";

test.describe("update bundle product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createBundleProductResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-bundle-product-createResponse.json",
        "utf-8"
    );

    const createSimpleProductResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-product-createResponse.json",
        "utf-8"
    );

    const createSimpleProductID = JSON.parse(createSimpleProductResponse)
        .createProduct.product.id;
    console.log(
        "Simple Product ID to be used as bundle option:",
        createSimpleProductID
    );

    console.log(
        "Create Product Response from file:",
        createBundleProductResponse
    );

    // const variant_product_id1 = JSON.parse(createGroupProductResponse).createProduct.product.variants[0].id;
    // const variant_product_id2 = JSON.parse(createGroupProductResponse).createProduct.product.variants[1].id;

    test("update downloadable product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateBundleProductDetails = {
            channel: "default",
            locale: "en",
            sku: `bundle-demo1${randomSuffix}`,
            name: `bundle-demo1${randomSuffix}`,
            urlKey: `bundle-demo1${randomSuffix}`,
            productNumber: `${randomSuffix}`,
            taxCategoryId: 1,
            new: { withAuth: true },
            featured: { withAuth: true },
            visibleIndividually: { withAuth: true },
            status: { withAuth: true },
            guestCheckout: { withAuth: true },
            color: 3,
            size: 9,
            shortDescription: "<p>bundle-demo1 Short Description</p>",
            description: "<p>bundle-demo1 Description</p>",
            metaTitle: "bundle-demo1 Meta Title",
            metaKeywords: "bundle-demo1 Meta Keywords",
            metaDescription: "bundle-demo1 Meta Description",
            price: 0,
            weight: 0,
            bundleOptions: [
                {
                    locales: [
                        {
                            code: "en",
                            label: `label-option-${randomSuffix}`,
                        },
                    ],
                    type: "radio",
                    isRequired: { withAuth: true },
                    sortOrder: 1,
                    products: [
                        {
                            productId: createSimpleProductID,
                            qty: 3,
                        },
                    ],
                },
            ],
            categories: [1],
            channels: [1],
            upSells: [Number(createSimpleProductID)],
            crossSells: [Number(createSimpleProductID)],
            relatedProducts: [Number(createSimpleProductID)],
            images: [
                "https://cdn.pixabay.com/photo/2016/12/19/08/39/mobile-phone-1917737_960_720.jpg",
                "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_960_720.jpg",
            ],
        };

        const cre = JSON.parse(createBundleProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateBundleProductMutation,
            {
                id: product_id,
                input: updateBundleProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-bundle-product-Response.json"
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
            updateBundleProductDetails.sku
        );

        expect(cre.createProduct.product.name).not.toEqual(
            updateBundleProductDetails.name
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

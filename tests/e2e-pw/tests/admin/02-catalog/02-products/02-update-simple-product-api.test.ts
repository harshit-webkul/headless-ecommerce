import { expect, test } from "@playwright/test";
import {
    updateCustomizableProductMutation,
} from "../../../../mutations/simple-product-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update simple product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createProductResponse = fs.readFileSync(
        "vendor/bagisto/graphql-api/tests/e2e-pw/create-product-createResponse.json",
        "utf-8"
    );
    // console.log("Create Product Response from file:", createProductResponse);

    test("update product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const updateProductDetails = {
            channel: "default",
            locale: "en",
            sku: `product-updated-number-${randomSuffix}`,
            name: `product-updated-number-${randomSuffix}`,
            urlKey: `product-updated-number-${randomSuffix}`,
            productNumber: "",
            taxCategoryId: "",
            new: { withAuth: true },
            featured: { withAuth: true },
            visibleIndividually: { withAuth: true },
            status: { withAuth: true },
            guestCheckout: false,
            color: 3,
            size: 9,
            shortDescription: "<p>Home Decor Short Description</p>",
            description: "<p>Home Decor Description</p>",
            metaTitle: "Home Decor Meta Title",
            metaKeywords: "Home Decor Meta Keywords",
            metaDescription: "Home Decor Meta Description",
            price: 12.55,
            cost: 11.5,
            specialPrice: 11.3,
            specialPriceFrom: "2021-02-08",
            specialPriceTo: "2023-02-28",
            width: 30,
            height: 24,
            weight: 5.2,
            customerGroupPrices: [
                {
                    customerGroupId: 2,
                    qty: 2,
                    valueType: "fixed",
                    value: 10,
                },
                {
                    customerGroupId: 3,
                    qty: 3,
                    valueType: "discount",
                    value: 2,
                },
            ],
            inventories: [
                {
                    inventorySourceId: 1,
                    qty: 50,
                },
            ],
            manageStock: false,
            categories: [1],
            channels: [1],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [],
            videos: [],
            customizableOptions: [
                {
                    label: "Text",
                    type: "TEXT",
                    isRequired: { withAuth: true },
                    sortOrder: 0,
                    maxCharacters: 10,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            price: 10,
                        },
                    ],
                },
                {
                    label: "TextArea",
                    type: "TEXTAREA",
                    isRequired: { withAuth: true },
                    sortOrder: 1,
                    maxCharacters: 100,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            price: 20,
                        },
                    ],
                },
                {
                    label: "Checkbox",
                    type: "CHECKBOX",
                    isRequired: { withAuth: true },
                    sortOrder: 2,
                    maxCharacters: 0,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            label: "Checkbox 1",
                            price: 5,
                            sortOrder: 0,
                        },
                        {
                            label: "Checkbox 2",
                            price: 10,
                            sortOrder: 1,
                        },
                    ],
                },
                {
                    label: "Radio",
                    type: "RADIO",
                    isRequired: { withAuth: true },
                    sortOrder: 3,
                    maxCharacters: 0,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            label: "Radio 1",
                            price: 15,
                            sortOrder: 0,
                        },
                        {
                            label: "Radio 2",
                            price: 10,
                            sortOrder: 1,
                        },
                    ],
                },
                {
                    label: "Select",
                    type: "SELECT",
                    isRequired: { withAuth: true },
                    sortOrder: 4,
                    maxCharacters: 0,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            label: "Select 1",
                            price: 5,
                            sortOrder: 0,
                        },
                        {
                            label: "Select 2",
                            price: 20,
                            sortOrder: 1,
                        },
                    ],
                },
                {
                    label: "Multiselect",
                    type: "MULTISELECT",
                    isRequired: { withAuth: true },
                    sortOrder: 5,
                    maxCharacters: 0,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            label: "Multiselect 1",
                            price: 1,
                            sortOrder: 0,
                        },
                        {
                            label: "Multiselect 2",
                            price: 9,
                            sortOrder: 1,
                        },
                    ],
                },
                {
                    label: "Date",
                    type: "DATE",
                    isRequired: { withAuth: true },
                    sortOrder: 6,
                    maxCharacters: 0,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            price: 8,
                        },
                    ],
                },
                {
                    label: "DateTime",
                    type: "DATETIME",
                    isRequired: { withAuth: true },
                    sortOrder: 7,
                    maxCharacters: 0,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            price: 6,
                        },
                    ],
                },
                {
                    label: "Time",
                    type: "TIME",
                    isRequired: { withAuth: true },
                    sortOrder: 8,
                    maxCharacters: 0,
                    supportedFileExtensions: "",
                    prices: [
                        {
                            price: 5,
                        },
                    ],
                },
                {
                    label: "File",
                    type: "FILE",
                    isRequired: { withAuth: true },
                    sortOrder: 9,
                    maxCharacters: 0,
                    supportedFileExtensions: "jpg,png,pdf",
                    prices: [
                        {
                            price: 5,
                        },
                    ],
                },
            ],
        };

        const cre = JSON.parse(createProductResponse)
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateCustomizableProductMutation,
            {
                id: product_id,
                input: updateProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(process.cwd(), "create-product-updateResponse.json");
        fs.writeFileSync(filePath, JSON.stringify(updateResponse, null, 2), "utf-8");

        expect(updateResponse.updateProduct.success).toBe({ withAuth: true });
        expect(updateResponse.updateProduct.message).toContain(
            "Product updated successfully."
        );
        expect(updateResponse.updateProduct.product).toHaveProperty("id");
        expect(updateResponse.updateProduct.product.sku).toBe(
            updateProductDetails.sku
        );
       
        expect(cre.createProduct.product.name).not.toEqual(
            updateProductDetails.name
        );

        expect(cre.createProduct.product.sku).not.toEqual(
            updateProductDetails.sku
        );

        const createdProductId = cre.createProduct.product.id;


        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            "SELECT * FROM products WHERE id = ?",
            [createdProductId]
        );

        console.log("Product in DB:", productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.sku).toBe(updateProductDetails.sku);
    });
});

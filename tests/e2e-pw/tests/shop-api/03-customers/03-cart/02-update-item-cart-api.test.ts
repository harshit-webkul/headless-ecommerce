import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import {
    createSimpleProductMutation,
    updateCustomizableProductMutation,
} from "../../../../mutations/simple-product-api-mutation";
import {
    addItemToCartMutation,
    updateItemsToCartMutation,
} from "../../../../mutations/shop-mutation/customers/cart-mutation/cart-mutation";

test.describe("Shop: Update Item in Cart via GraphQL API", () => {
    let apiClient = new GraphQLClient();
    let customerApiClient = new GraphQLCustomerClient();

    test("update cart item quantity via graphQL shop api", async () => {
        const randomSuffix = Date.now();

        const createProductCredentials = {
            type: "simple",
            attributeFamilyId: 1,
            sku: `testing-product-number-${randomSuffix}`,
        };

        const createResponse = await apiClient.execute(
            createSimpleProductMutation,
            {
                input: createProductCredentials,
            },
            { withAuth: true }
        );

        console.log("Create Product Response:", createResponse);

        expect(createResponse.createProduct.success).toBe(true);
        expect(createResponse.createProduct.message).toContain(
            "Product created successfully."
        );

        const createdProductId = createResponse.createProduct.product.id;

        const updateProductDetails = {
            channel: "default",
            locale: "en",
            sku: `product-updated-number-${randomSuffix}`,
            name: `product-updated-number-${randomSuffix}`,
            urlKey: `product-updated-number-${randomSuffix}`,
            productNumber: "",
            taxCategoryId: "",
            new: true,
            featured: true,
            visibleIndividually: true,
            status: true,
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
            manageStock: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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
                    isRequired: true,
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

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateCustomizableProductMutation,
            {
                id: createdProductId,
                input: updateProductDetails,
            },
            { withAuth: true }
        );
        console.log("Product ID:", createdProductId);

        console.log("Update Product Response:", updateResponse);

        const addItemInput = {
            productId: createdProductId,
            quantity: 2,
            customizableOptions: [
                {
                    id: 4,
                    value: ["Option 1"],
                },
                {
                    id: 5,
                    value: ["Option 2"],
                },
                {
                    id: 6,
                    value: ["6", "7"],
                },
                {
                    id: 7,
                    value: ["9"],
                },
                {
                    id: 8,
                    value: ["10"],
                },
                {
                    id: 9,
                    value: ["12", "13"],
                },
                {
                    id: 10,
                    value: ["2025-05-26"],
                },
                {
                    id: 11,
                    value: ["2025-05-26 19:00:00"],
                },
                {
                    id: 12,
                    value: ["13:10"],
                },
                {
                    id: 13,
                },
            ],
        };

        const res = await customerApiClient.customerExecute(
            addItemToCartMutation,
            { input: addItemInput },
            { withAuth: true }
        );

        console.log(res);
        const cartItemId = res.addItemToCart.cart.items[0].id;
        console.log( "cart item id :",cartItemId);

        const updateInput = {
            cartItemId: cartItemId,
            quantity: 2,
        };

        const updateRes = await customerApiClient.customerExecute(
            updateItemsToCartMutation,
            { input: { qty: {updateInput} } },
            { withAuth: true }
        );

        console.log("Update Item Response:", updateRes);

        expect(updateRes.updateItemToCart).toBeTruthy();
        expect(updateRes.updateItemToCart.success).toBe(true);

        const updatedItem = updateRes.updateItemToCart.cart.items.find(
            (i: any) => i.id === cartItemId
        );
        expect(Number(updatedItem.quantity)).toBe(2);
    });
});

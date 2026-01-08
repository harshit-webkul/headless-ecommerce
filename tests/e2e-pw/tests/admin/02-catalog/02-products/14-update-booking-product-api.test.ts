import { expect, test } from "@playwright/test";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";
import { updateBundleProductMutation } from "../../../../mutations/bundle-product-api-mutation";
import { updateBookingProductMutation } from "../../../../mutations/booking-product-api-mutation";

test.describe("update booking product via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    function formatDateTime(date: Date): string {
        const pad = (n: number) => n.toString().padStart(2, "0");

        return (
            `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
                date.getDate()
            )} ` +
            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
                date.getSeconds()
            )}`
        );
    }

    function getNowAndAfter3DaysFormatted() {
        const now = new Date();
        const after3Days = new Date(now);
        after3Days.setDate(now.getDate() + 3);

        return {
            from: formatDateTime(now),
            to: formatDateTime(after3Days),
        };
    }

    // const variant_product_id1 = JSON.parse(createGroupProductResponse).createProduct.product.variants[0].id;
    // const variant_product_id2 = JSON.parse(createGroupProductResponse).createProduct.product.variants[1].id;

    test("update default booking[bookingType: 'ONE'] product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const createBookingProductResponse = fs.readFileSync(
            `create-booking-product0-createResponse.json`,
            "utf-8"
        );
        console.log(
            "Create Product Response from file:",
            createBookingProductResponse
        );

        const availableFromTo = getNowAndAfter3DaysFormatted();
        console.log("Available From:", availableFromTo.from);
        console.log("Available To:", availableFromTo.to);

        const updateBookingProductDetails = {
            channel: "default",
            locale: "en",
            sku: `booking-${randomSuffix}`,
            name: `booking-${randomSuffix}`,
            urlKey: `booking-${randomSuffix}`,
            taxCategoryId: "",
            new: true,
            featured: true,
            visibleIndividually: true,
            status: true,
            color: 3,
            size: 9,
            shortDescription:
                "<p>booking-${randomSuffix} Short Description</p>",
            description: "<p>booking-${randomSuffix} Description</p>",
            metaTitle: "booking-${randomSuffix} Meta Title",
            metaKeywords: "booking-${randomSuffix} Meta Keywords",
            metaDescription: "booking-${randomSuffix} Meta Description",
            price: 12.55,
            cost: 11.5,
            specialPrice: 11.3,
            specialPriceFrom: "2021-02-08",
            specialPriceTo: "2023-02-28",
            width: 30,
            height: 24,
            weight: 5.2,
            // customerGroupPrices: [{
            //     customerGroupId: 2,
            //     qty: 2,
            //     valueType: "fixed",
            //     value: 10,
            // }, {
            //     customerGroupId: 3,
            //     qty: 3,
            //     valueType: "discount",
            //     value: 2,
            // }],
            categories: [],
            channels: [],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [
                "https://cdn.pixabay.com/photo/2017/05/23/10/53/t-shirt-design-2336850_960_720.jpg",
                "https://cdn.pixabay.com/photo/2017/05/28/18/38/t-shirt-2351761_960_720.jpg",
                "https://cdn.pixabay.com/photo/2019/07/27/21/42/t-shirt-4367577_960_720.jpg",
            ],
            videos: ["http://techslides.com/demos/sample-videos/small.webm"],
            // # Type of Booking:-
            // # DEFAULT, APPOINTMENT, EVENT, RENTAL, TABLE
            // # Available Days:-
            // # SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY

            /**
             * Type of Booking:- DEFAULT
             */
            booking: {
                type: "DEFAULT",
                location: "Delhi",
                qty: 1,
                availableFrom: availableFromTo.from,
                availableTo: availableFromTo.to,
                /**
                 * Booking Information for bookingType: ONE
                 */
                bookingType: "ONE",
                slots: [
                    {
                        id: 0,
                        fromDay: "SUNDAY",
                        from: "12:00",
                        toDay: "MONDAY",
                        to: "12:00",
                    },
                    {
                        id: 1,
                        fromDay: "FRIDAY",
                        from: "12:00",
                        toDay: "SATURDAY",
                        to: "12:00",
                    },
                ],

                //  }
                // # APPOINTMENT
                // # booking: {
                // #     type: APPOINTMENT
                // #     location: "Delhi"
                //     # qty: 1
                //     # availableEveryWeek: "1"
                //     # duration: 50
                //     # breakTime: 25
                //     # sameSlotAllDays: "1"
                //     # slots: [{
                //     #     from: "12:00"
                //     #     to: "05:00"
                //     # }, {
                //     #     from: "01:00"
                //     #     to: "06:00"
                //     # },{
                //     #     from: "01:00"
                //     #     to: "04:00"
                //     # }, {
                //     #     from: "05:00"
                //     #     to: "08:00"
                //     # }]
                //     # availableEveryWeek: "0"
                // #     availableFrom: "2025-05-07 12:00:00"
                // #     availableTo: "2025-05-20 12:00:00"
                // #     duration: 50
                // #     breakTime: 25
                // #     sameSlotAllDays: "0"
                // #     slots: [{
                // #         from: "12:00"
                // #         to: "01:00"
                // #         day: SUNDAY
                // #     }, {
                // #         from: "02:00"
                // #         to: "03:00"
                // #         day: SUNDAY
                // #     },{
                // #         from: "04:00"
                // #         to: "05:00"
                // #         day: SUNDAY
                // #     }, {
                // #         from: "01:00"
                // #         to: "02:00"
                // #         day: TUESDAY
                // #     }, {
                // #         from: "01:00"
                // #         to: "02:00"
                // #         day: THURSDAY
                // #     }, {
                // #         from: "02:00"
                // #         to: "03:00"
                // #         day: THURSDAY
                // #     }, {
                // #         from: "03:00"
                // #         to: "04:00"
                // #         day: THURSDAY
                // #     }]
                // # }
                // # EVENT
                // # booking: {
                // #     type: EVENT
                // #     location: "Delhi"
                // #     availableFrom: "2025-05-07 12:00:00"
                // #     availableTo: "2025-05-20 12:00:00"
                // #     tickets: [{
                // #         locales: {
                // #             locale: "en"
                // #             name: "Anmol"
                // #             description: "Event Event"
                // #         }
                // #         qty: 5
                // #         price: 100
                // #         specialPrice: 85
                // #         specialPriceFrom: "2025-05-08 12:00:00"
                // #         specialPriceTo: "2025-05-20 12:00:00"
                // #     }, {
                // #         locales: {
                // #             locale: "en"
                // #             name: "Seller 1"
                // #             description: "2025-05-08 12:00:00"
                // #         }
                // #         qty: 8
                // #         price: 120
                // #         specialPrice: 110
                // #         specialPriceFrom: "2025-05-08 12:00:00"
                // #         specialPriceTo: "2025-05-18 12:00:00"
                // #     }]
                // # }
                // # RENTAL
                // booking: {
                //     type: RENTAL
                //     location: "Delhi"
                //     qty: 1
                //     # availableFrom, availableTo Required is availableEveryWeek is 0
                //     availableFrom: "2025-05-07 12:00:00"
                //     availableTo: "2025-05-20 12:00:00"
                //     availableEveryWeek: "0"
                //     # DAILY_BASIS, HOURLY_BASIS, BOTH_DAILY_HOURLY_BASIS
                //     rentalSlot: {
                //         rentingType: HOURLY_BASIS
                //         # If DAILY_BASIS or BOTH_DAILY_HOURLY_BASIS
                //         # dailyPrice: 100
                //         # if HOURLY_BASIS or BOTH_DAILY_HOURLY_BASIS
                //         hourlyPrice: 80
                //     }
                //     # if HOURLY_BASIS or BOTH_DAILY_HOURLY_BASIS
                //     sameSlotAllDays: "1"
                //     slots: [{
                //         from: "12:00"
                //         to: "05:00"
                //     }, {
                //         from: "01:00"
                //         to: "06:00"
                //     },{
                //         from: "01:00"
                //         to: "04:00"
                //     }, {
                //         from: "05:00"
                //         to: "08:00"
                //     }]
                // }
                // # TABLE
                // # booking: {
                // #     type: TABLE
                // #     location: "Delhi"
                // #     # availableFrom, availableTo Required is availableEveryWeek is 0
                // #     availableEveryWeek: "0"
                // #     availableFrom: "2025-05-07 12:00:00"
                // #     availableTo: "2025-05-20 12:00:00"
                // #     tableSlot: {
                // #         priceType: GUEST #GUEST, TABLE
                // #         # TABLE
                // #         # guestLimit: 10
                // #         preventSchedulingBefore: 10
                // #     }
                // #     qty: 1
                // #     duration: 50
                // #     breakTime: 25
                // #     sameSlotAllDays: "1"
                // #     slots: [{
                // #         from: "12:00"
                // #         to: "05:00"
                // #     }, {
                // #         from: "01:00"
                // #         to: "06:00"
                // #     },{
                // #         from: "01:00"
                // #         to: "04:00"
                // #     }, {
                // #         from: "05:00"
                // #         to: "08:00"
                // #     }]
                // # }
            },
        };
        const cre = JSON.parse(createBookingProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateBookingProductMutation,
            {
                id: product_id,
                input: updateBookingProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-booking0-product-Response.json"
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
        expect(cre.createProduct.product.sku).not.toEqual(
            updateBookingProductDetails.sku
        );

        expect(cre.createProduct.product.name).not.toEqual(
            updateBookingProductDetails.name
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

    test("update default booking[bookingType: 'MANY'] product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const createBookingProductResponse = fs.readFileSync(
            `create-booking-product1-createResponse.json`,
            "utf-8"
        );
        console.log(
            "Create Product Response from file:",
            createBookingProductResponse
        );

        const availableFromTo = getNowAndAfter3DaysFormatted();
        console.log("Available From:", availableFromTo.from);
        console.log("Available To:", availableFromTo.to);

        const updateBookingProductDetails = {
            channel: "default",
            locale: "en",
            sku: `booking-${randomSuffix}`,
            name: `booking-${randomSuffix}`,
            urlKey: `booking-${randomSuffix}`,
            taxCategoryId: "",
            new: true,
            featured: true,
            visibleIndividually: true,
            status: true,
            color: 3,
            size: 9,
            shortDescription:
                "<p>booking-${randomSuffix} Short Description</p>",
            description: "<p>booking-${randomSuffix} Description</p>",
            metaTitle: "booking-${randomSuffix} Meta Title",
            metaKeywords: "booking-${randomSuffix} Meta Keywords",
            metaDescription: "booking-${randomSuffix} Meta Description",
            price: 12.55,
            cost: 11.5,
            specialPrice: 11.3,
            specialPriceFrom: "2021-02-08",
            specialPriceTo: "2023-02-28",
            width: 30,
            height: 24,
            weight: 5.2,
            // customerGroupPrices: [{
            //     customerGroupId: 2,
            //     qty: 2,
            //     valueType: "fixed",
            //     value: 10,
            // }, {
            //     customerGroupId: 3,
            //     qty: 3,
            //     valueType: "discount",
            //     value: 2,
            // }],
            categories: [],
            channels: [],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [
                "https://cdn.pixabay.com/photo/2017/05/23/10/53/t-shirt-design-2336850_960_720.jpg",
                "https://cdn.pixabay.com/photo/2017/05/28/18/38/t-shirt-2351761_960_720.jpg",
                "https://cdn.pixabay.com/photo/2019/07/27/21/42/t-shirt-4367577_960_720.jpg",
            ],
            videos: ["http://techslides.com/demos/sample-videos/small.webm"],

            /**
             * Type of Booking:- DEFAULT
             */
            booking: {
                type: "DEFAULT",
                location: "Delhi",
                qty: 1,
                availableFrom: availableFromTo.from,
                availableTo: availableFromTo.to,

                /**
                 * Booking Information for bookingType: MANY
                 */
                bookingType: "MANY",
                slots: [
                    {
                        // id: 0,
                        day: "WEDNESDAY",
                        from: "10:00",
                        to: "12:00",
                        status: "1",
                    },
                    {
                        // id: 1,
                        day: "THURSDAY",
                        from: "10:00",
                        to: "12:00",
                        status: "1",
                    },
                ],
                //      duration: 45,
                //      breakTime: 15,
            },
        };
        const cre = JSON.parse(createBookingProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateBookingProductMutation,
            {
                id: product_id,
                input: updateBookingProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-booking1-product-Response.json"
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
        expect(cre.createProduct.product.sku).not.toEqual(
            updateBookingProductDetails.sku
        );

        expect(cre.createProduct.product.name).not.toEqual(
            updateBookingProductDetails.name
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

    test("update APPOINTMENT booking[availableEveryWeek: YES] product via graphQL api", async () => {
        const randomSuffix = Date.now();

        const createBookingProductResponse = fs.readFileSync(
            `create-booking-product2-createResponse.json`,
            "utf-8"
        );
        console.log(
            "Create Product Response from file:",
            createBookingProductResponse
        );

        const availableFromTo = getNowAndAfter3DaysFormatted();
        console.log("Available From:", availableFromTo.from);
        console.log("Available To:", availableFromTo.to);

        const updateBookingProductDetails = {
            channel: "default",
            locale: "en",
            sku: `booking-${randomSuffix}`,
            name: `booking-${randomSuffix}`,
            urlKey: `booking-${randomSuffix}`,
            taxCategoryId: "",
            new: true,
            featured: true,
            visibleIndividually: true,
            status: true,
            color: 3,
            size: 9,
            shortDescription:
                "<p>booking-${randomSuffix} Short Description</p>",
            description: "<p>booking-${randomSuffix} Description</p>",
            metaTitle: "booking-${randomSuffix} Meta Title",
            metaKeywords: "booking-${randomSuffix} Meta Keywords",
            metaDescription: "booking-${randomSuffix} Meta Description",
            price: 12.55,
            cost: 11.5,
            specialPrice: 11.3,
            specialPriceFrom: "2021-02-08",
            specialPriceTo: "2023-02-28",
            width: 30,
            height: 24,
            weight: 5.2,
            // customerGroupPrices: [{
            //     customerGroupId: 2,
            //     qty: 2,
            //     valueType: "fixed",
            //     value: 10,
            // }, {
            //     customerGroupId: 3,
            //     qty: 3,
            //     valueType: "discount",
            //     value: 2,
            // }],
            categories: [],
            channels: [],
            upSells: [],
            crossSells: [],
            relatedProducts: [],
            images: [
                "https://cdn.pixabay.com/photo/2017/05/23/10/53/t-shirt-design-2336850_960_720.jpg",
                "https://cdn.pixabay.com/photo/2017/05/28/18/38/t-shirt-2351761_960_720.jpg",
                "https://cdn.pixabay.com/photo/2019/07/27/21/42/t-shirt-4367577_960_720.jpg",
            ],
            videos: [],

            /**
             * Type of Booking:- APPOINTMENT
             */
            booking: {
                type: "APPOINTMENT",
                location: "Delhi",
                qty: 10,
                availableEveryWeek: "1",
                duration: 50,
                breakTime: 25,
                sameSlotAllDays: "1",
                slots: [
                    {
                        from: "01:00",
                        to: "05:00",
                    },
                    {
                        from: "2:00",
                        to: "04:00",
                    },
                    {
                        from: "01:00",
                        to: "04:00",
                    },
                    {
                        from: "08:00",
                        to: "05:00",
                    },
                ],

            //     availableEveryWeek: "0",
            //     availableFrom: "2025-05-07 12:00:00",
            //     availableTo: "2025-05-20 12:00:00",
            //     duration: 50,
            //     breakTime: 25,
            //     sameSlotAllDays: "0",
            //     slots: [
            //         {
            //             from: "12:00",
            //             to: "01:00",
            //             day: "SUNDAY",
            //         },
            //         {
            //             from: "02:00",
            //             to: "03:00",
            //             day: "SUNDAY",
            //         },
            //         {
            //             from: "04:00",
            //             to: "05:00",
            //             day: "SUNDAY",
            //         },
            //         {
            //             from: "01:00",
            //             to: "02:00",
            //             day: "TUESDAY",
            //         },
            //         {
            //             from: "01:00",
            //             to: "02:00",
            //             day: "THURSDAY",
            //         },
            //         {
            //             from: "02:00",
            //             to: "03:00",
            //             day: "THURSDAY",
            //         },
            //         {
            //             from: "03:00",
            //             to: "04:00",
            //             day: "THURSDAY",
            //         },
            //     ],
            },
        };
        const cre = JSON.parse(createBookingProductResponse);
        const product_id = Number(cre.createProduct.product.id);
        console.log("Product ID to update:", product_id);

        /**
         * Execute create product mutation
         */
        const updateResponse = await apiClient.execute(
            updateBookingProductMutation,
            {
                id: product_id,
                input: updateBookingProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const filePath = path.resolve(
            process.cwd(),
            "update-booking3-product-Response.json"
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
        expect(cre.createProduct.product.sku).not.toEqual(
            updateBookingProductDetails.sku
        );

        expect(cre.createProduct.product.name).not.toEqual(
            updateBookingProductDetails.name
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

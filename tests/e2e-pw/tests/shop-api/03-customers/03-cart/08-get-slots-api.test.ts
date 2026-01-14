import { test, expect } from "@playwright/test";
import { GraphQLCustomerClient } from "../../../../utils/customerApiClient";
import { getSlotsQuery } from "../../../../mutations/shop-mutation/customers/cart-mutation/cart-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import {
    createBookingProductMutation,
    updateBookingProductMutation,
} from "../../../../mutations/booking-product-api-mutation";

test.describe("Shop: Get Slots via GraphQL API", () => {
    test("get slots via graphQL shop api", async () => {
        const client = new GraphQLCustomerClient();
        const adminClient = new GraphQLClient();
        const randomSuffix = Date.now();
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

        /**
         * Create Booking Product vai API
         */

        const createBookingProductCredentials = {
            type: "booking",
            attributeFamilyId: 1,
            sku: `booking-product-${randomSuffix}`,
        };

        /**
         * Execute create product mutation
         */
        const createBookingResponse = await adminClient.execute(
            createBookingProductMutation,
            {
                input: createBookingProductCredentials,
            },
            { withAuth: true }
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
            // specialPriceFrom: "2021-02-08",
            // specialPriceTo: "2023-02-28",
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
                        to: "15:00",
                    },
                    {
                        id: 1,
                        fromDay: "FRIDAY",
                        from: "12:00",
                        toDay: "SATURDAY",
                        to: "12:00",
                    },
                ],
            },
        };

        const createdBookingProductId =
            createBookingResponse.createProduct.product.id;

        /**
         * Execute create product mutation
         */
        const updateResponse = await adminClient.execute(
            updateBookingProductMutation,
            {
                id: createdBookingProductId,
                input: updateBookingProductDetails,
            },
            { withAuth: true }
        );

        console.log("Update Product Response:", updateResponse);

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tomorrowDate = tomorrow.toISOString().slice(0, 10);        const res = await client.customerExecute(
            getSlotsQuery,
            { id: createdBookingProductId, date: tomorrowDate },
            { withAuth: true }
        );

        console.log("get slots Response:", res);

        expect(res.getSlots).toBeDefined();
    });
});

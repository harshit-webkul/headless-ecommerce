// import { test, expect } from "@playwright/test";
// import { GraphQLCustomerClient } from "../../../../../utils/customerApiClient";
// import { moveToCartMutation } from "../../../../../mutations/shop-mutation/customers/wishlists/wishlists-mutation";
// import * as fs from "fs";

// test.describe("Shop: Move wishlist item to cart via GraphQL API", () => {
//     const signUpPayload = fs.readFileSync(
//         "signup-customer-shop-createResponse.json",
//         "utf-8"
//     );
//     const cre = JSON.parse(signUpPayload);
//     const accessToken = cre.customerSignUp.accessToken;

//     const addWishlistPayload = fs.readFileSync(
//         "add-to-wishlist-shop-createResponse.json",
//         "utf-8"
//     );
//     const added = JSON.parse(addWishlistPayload);
//     const wishlist_id = Number(added.addToWishlist.wishlist.id);

//     test("move wishlist item to cart via graphQL shop api", async () => {
//         const client = new GraphQLCustomerClient();
//         client.setCustomerToken(accessToken);

//         const res = await client.customerExecute(moveToCartMutation, { id: wishlist_id, quantity: 1 }, { withAuth: true });

//         console.log('Move to cart Response:', res);

//         expect(res.moveToCart).toBeTruthy();
//         expect(res.moveToCart.success).toBe(true);
//         expect(res.moveToCart.wishlist.movedToCart).toBe(true);

//         fs.writeFileSync("move-to-cart-shop-response.json", JSON.stringify(res, null, 2), "utf-8");
//     });
// });

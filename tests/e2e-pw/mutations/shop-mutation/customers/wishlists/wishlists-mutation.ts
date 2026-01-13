export const addToWishlistMutation = `
    mutation addToWishlist ($productId: ID!) {
    addToWishlist (
        productId: $productId
    ) {
        success
        message
        wishlist {
            id
            channelId
            productId
            customerId
            additional
            movedToCart
            shared
            createdAt
            updatedAt
            customer {
                id
            }
            product {
                id
            }
            channel {
                id
            }
        }
    }
}
`;

export const getAllWishlistsProductQuery = `
    query wishlists ($input: FilterWislistInput , $page: Int, $first: Int ) {
    wishlists (
        first: $first
        page: $page
        input: $input) {
        paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data {
            id
            channelId
            productId
            customerId
            additional
            movedToCart
            shared
            createdAt
            updatedAt
            customer {
                id
            }
            product {
                id
                channels {
                    id
                }
            }
            channel {
                id
            }
        }
    }
}
`;

export const getParticularWishlistMutation = `
    query wishlist ($id: ID!) {
    wishlist (
        id: $id
    ) {
        id
        channelId
        productId
        customerId
        additional
        movedToCart
        shared
        createdAt
        updatedAt
        customer {
            id
            activeCarts {
                id
                customerEmail
                customerFirstName
                customerLastName
                shippingMethod
                couponCode
                isGift
                itemsCount
                itemsQty
            }
        }
        product {
            id
        }
        channel {
            id
        }
    }
}
`;

export const removeFromWishlistMutation  = `
    mutation removeFromWishlist ($productId: ID!) {
    removeFromWishlist (
        productId: $productId
    ) {
        success
        message
    }
}
`;

export const removeAllWishlistsMutation = `
    mutation removeAllWishlists {
    removeAllWishlists {
        success
        message
    }
}
`;
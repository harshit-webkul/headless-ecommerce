export const addToCompareMutation = `
    mutation addToCompare($productId: ID!) {
    addToCompare (
        productId: $productId
    ) {
        success
        message
        compareProduct {
            id
            productId
            customerId
            createdAt
            updatedAt
            customer {
                id
                firstName
                lastName
                name
                gender
                dateOfBirth
                email
                phone
                password
                apiToken
                customerGroupId
                subscribedToNewsLetter
                isVerified
                token
                notes {
                    id
                    customerId
                    note
                    customerNotified
                    createdAt
                    updatedAt
                }
                status
                createdAt
                updatedAt
            }
            cart {
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
        cart {
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
}
`;

export const getAllCompareProductsQuery = `
    query compareProducts($first: Int, $page: Int, $input: FilterCompareProductsInput) {
        compareProducts(
            first: $first
            page: $page
            input: $input
        ) {
            paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
            data {
                id
                productId
                customerId
                createdAt
                updatedAt
                product {
                    id
                    sku
                    type
                    isInWishlist
                    id
                    sku
                    name
                    description
                    shortDescription
                    urlKey
                    new
                    featured
                    status
                    visibleIndividually
                    priceHtml {
                        id
                        type
                        priceHtml
                        priceWithoutHtml
                        minPrice
                        regularPrice
                        formattedRegularPrice
                        finalPrice
                        formattedFinalPrice
                        currencyCode
                        bundlePrice {
                            finalPriceFrom
                            formattedFinalPriceFrom
                            regularPriceFrom
                            formattedRegularPriceFrom
                            finalPriceTo
                            formattedFinalPriceTo
                            regularPriceTo
                            formattedRegularPriceTo
                        }
                    }
                }
                customer {
                    id
                    firstName
                    lastName
                    name
                    gender
                    dateOfBirth
                    email
                    phone
                    password
                    apiToken
                    customerGroupId
                    subscribedToNewsLetter
                    isVerified
                    token
                    notes {
                        id
                        customerId
                        note
                        customerNotified
                        createdAt
                        updatedAt
                    }
                    status
                    createdAt
                    updatedAt
                }
                cart {
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
        }
    }
`;

export const getParticularCompareProductsQuery = `
    query compareProduct($id: ID!) {
        compareProduct(
            id: $id
        ) {
            id
            productId
            customerId
            createdAt
            updatedAt
            product {
                id
                sku
                type
                isInWishlist
                id
                sku
                name
                description
                shortDescription
                urlKey
                new
                featured
                status
                visibleIndividually
                priceHtml {
                    id
                    type
                    priceHtml
                    priceWithoutHtml
                    minPrice
                    regularPrice
                    formattedRegularPrice
                    finalPrice
                    formattedFinalPrice
                    currencyCode
                    bundlePrice {
                        finalPriceFrom
                        formattedFinalPriceFrom
                        regularPriceFrom
                        formattedRegularPriceFrom
                        finalPriceTo
                        formattedFinalPriceTo
                        regularPriceTo
                        formattedRegularPriceTo
                    }
                }
            }
            customer {
                id
                firstName
                lastName
                name
                gender
                dateOfBirth
                email
                phone
                password
                apiToken
                customerGroupId
                subscribedToNewsLetter
                isVerified
                token
                notes {
                    id
                    customerId
                    note
                    customerNotified
                    createdAt
                    updatedAt
                }
                status
                createdAt
                updatedAt
            }
            cart {
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
    }
`;

export const removeCompareParticularProductMutation = `
    mutation removeFromCompareProduct($productId: ID!) {
        removeFromCompareProduct(productId: $productId) {
            success
            message
        }
    }
`;

export const removeAllCompareProductMutation = `
    mutation removeAllCompareProducts {
    removeAllCompareProducts {
        success
        message
    }
}
`;

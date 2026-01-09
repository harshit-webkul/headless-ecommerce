// mutations/shop/customer-profile-mutation.ts

export const getCustomerProfileQuery = `
    query customer {
        customer {
             id
        firstName
        lastName
        name
        gender
        dateOfBirth
        email
        phone
        image
        imageUrl
        status
        password
        apiToken
        customerGroupId
        channelId
        subscribedToNewsLetter
        isVerified
        isSuspended
        token
        rememberToken
        createdAt
        updatedAt
        customerGroup {
            id
            code
            name
            isUserDefined
            createdAt
            updatedAt
        }
        addresses {
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            country
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
        }
        defaultAddress {
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            country
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
        }
        invoices {
            id
            incrementId
            state
            emailSent
            totalQty
            baseCurrencyCode
            channelCurrencyCode
            orderCurrencyCode
            subTotal
            baseSubTotal
            grandTotal
            baseGrandTotal
            shippingAmount
            baseShippingAmount
            taxAmount
            baseTaxAmount
            discountAmount
            baseDiscountAmount
            shippingTaxAmount
            baseShippingTaxAmount
            subTotalInclTax
            baseSubTotalInclTax
            shippingAmountInclTax
            baseShippingAmountInclTax
            orderId
            transactionId
            reminders
            nextReminderAt
            createdAt
            updatedAt
            formattedPrice {
                subTotal
                baseSubTotal
                grandTotal
                baseGrandTotal
                shippingAmount
                baseShippingAmount
                taxAmount
                baseTaxAmount
                discountAmount
                baseDiscountAmount
                shippingTaxAmount
                baseShippingTaxAmount
                subTotalInclTax
                baseSubTotalInclTax
                shippingAmountInclTax
                baseShippingAmountInclTax
            }
            order {
                id
            }
            items {
                id
            }
            customer {
                id
            }
            channel {
                id
            }
        }
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
            # product {
            #     id
            # }
            channel {
                id
            }
            customer {
                id
            }
        }
        isWishlistShared
        getWishlistSharedLink
        allCarts {
            id
            customerEmail
            customerFirstName
            customerLastName
            shippingMethod
            couponCode
            isGift
            itemsCount
            itemsQty
            exchangeRate
            globalCurrencyCode
            baseCurrencyCode
            channelCurrencyCode
            cartCurrencyCode
            grandTotal
            baseGrandTotal
            subTotal
            baseSubTotal
            taxTotal
            baseTaxTotal
            discountAmount
            baseDiscountAmount
            shippingAmount
            baseShippingAmount
            shippingAmountInclTax
            baseShippingAmountInclTax
            subTotalInclTax
            baseSubTotalInclTax
            checkoutMethod
            isGuest
            isActive
            appliedCartRuleIds
            customerId
            channelId
            createdAt
            updatedAt
            formattedPrice {
                grandTotal
                baseGrandTotal
                subTotal
                baseSubTotal
                taxTotal
                baseTaxTotal
                discount
                baseDiscount
                discountedSubTotal
                baseDiscountedSubTotal
                shippingAmount
                baseShippingAmount
                shippingAmountInclTax
                baseShippingAmountInclTax
                subTotalInclTax
                baseSubTotalInclTax
            }
            items {
                id
            }
            allItems {
                id
            }
            billingAddress {
                id
            }
            shippingAddress {
                id
            }
            #shippingRates
            selectedShippingRate {
                id
                carrier
                carrierTitle
                method
                methodTitle
                methodDescription
                price
                basePrice
                discountAmount
                baseDiscountAmount
                isCalculateTax
                cartAddressId
                createdAt
                updatedAt
                shippingAddress {
                    id
                }
                formattedPrice {
                    price
                    basePrice
                }
            }
            payment {
                id
                method
                methodTitle
                cartId
                createdAt
                updatedAt
            }
            status
        }
        inactiveCarts {
            id
        }
        activeCarts {
            id
        }
        orders {
            id
            incrementId
            status
            channelName
            isGuest
            customerEmail
            customerFirstName
            customerLastName
            shippingMethod
            shippingTitle
            shippingDescription
            couponCode
            isGift
            totalItemCount
            totalQtyOrdered
            baseCurrencyCode
            channelCurrencyCode
            orderCurrencyCode
            grandTotal
            baseGrandTotal
            grandTotalInvoiced
            baseGrandTotalInvoiced
            grandTotalRefunded
            baseGrandTotalRefunded
            subTotal
            baseSubTotal
            subTotalInvoiced
            baseSubTotalInvoiced
            subTotalRefunded
            baseSubTotalRefunded
            discountPercent
            discountAmount
            baseDiscountAmount
            discountInvoiced
            baseDiscountInvoiced
            discountRefunded
            baseDiscountRefunded
            taxAmount
            baseTaxAmount
            taxAmountInvoiced
            baseTaxAmountInvoiced
            taxAmountRefunded
            baseTaxAmountRefunded
            shippingAmount
            baseShippingAmount
            shippingInvoiced
            baseShippingInvoiced
            shippingRefunded
            baseShippingRefunded
            shippingDiscountAmount
            baseShippingDiscountAmount
            shippingTaxAmount
            baseShippingTaxAmount
            shippingTaxRefunded
            baseShippingTaxRefunded
            subTotalInclTax
            baseSubTotalInclTax
            shippingAmountInclTax
            baseShippingAmountInclTax
            customerId
            customerType
            channelId
            channelType
            cartId
            appliedCartRuleIds
            createdAt
            updatedAt
            formattedPrice {
                grandTotal
                baseGrandTotal
                grandTotalInvoiced
                baseGrandTotalInvoiced
                grandTotalRefunded
                baseGrandTotalRefunded
                subTotal
                baseSubTotal
                subTotalInvoiced
                baseSubTotalInvoiced
                subTotalRefunded
                discountAmount
                baseDiscountAmount
                discountInvoiced
                baseDiscountInvoiced
                discountRefunded
                baseDiscountRefunded
                taxAmount
                baseTaxAmount
                taxAmountInvoiced
                baseTaxAmountInvoiced
                taxAmountRefunded
                baseTaxAmountRefunded
                shippingAmount
                baseShippingAmount
                shippingInvoiced
                baseShippingInvoiced
                shippingRefunded
                baseShippingRefunded
                shippingDiscountAmount
                baseShippingDiscountAmount
                shippingTaxAmount
                baseShippingTaxAmount
                shippingTaxRefunded
                baseShippingTaxRefunded
                subTotalInclTax
                baseSubTotalInclTax
                shippingAmountInclTax
                baseShippingAmountInclTax
            }
            items {
                id
            }
            comments {
                id
                orderId
                comment
                customerNotified
                createdAt
                updatedAt
                order {
                    id
                }
            }
            downloadableLinkPurchased {
                id
                productName
                name
                url
                file
                fileName
                type
                downloadBought
                downloadUsed
                status
                customerId
                orderId
                orderItemId
                downloadCanceled
                createdAt
                updatedAt
                customer {
                    id
                }
                order {
                    id
                }
                orderItem {
                    id
                }
            }
            shipments {
                id
                status
                totalQty
                totalWeight
                carrierCode
                carrierTitle
                trackNumber
                emailSent
                customerId
                customerType
                orderId
                orderAddressId
                inventorySourceId
                inventorySourceName
                createdAt
                updatedAt
                order {
                    id
                }
                items {
                    id
                }
                inventorySource {
                    id
                }
                customer {
                    id
                }
                address {
                    id
                }
            }
            invoices {
                id
            }
            refunds {
                id
            }
            customer {
                id
            }
            addresses {
                id
            }
            payment {
                id
            }
            billingAddress {
                id
            }
            shippingAddress {
                id
            }
            channel {
                id
            }
        }
        reviews {
            id
            name
            title
            rating
            comment
            status
            productId
            customerId
            createdAt
            updatedAt
            customer {
                id
            }
            #product
            images {
                id
                reviewId
                type
                mimeType
                path
                url
                review {
                    id
                }
            }
        }
        notes {
            id
            customerId
            note
            customerNotified
            createdAt
            updatedAt
            customer {
                id
            }
        }
        subscription {
            id
            email
            isSubscribed
            token
            customerId
            channelId
            createdAt
            updatedAt
        }
        }
    }
`;

// export const updateCustomerProfileMutation = `
//     mutation updateCustomerProfile($input: UpdateCustomerProfileInput!) {
//         updateCustomerProfile(input: $input) {
//             success
//             message
//             customer {
//                 id
//                 firstName
//                 lastName
//                 email
//                 phone
//                 dateOfBirth
//                 gender
//                 status
//                 isVerified
//                 createdAt
//                 updatedAt
//             }
//         }
//     }
// `;

export const deleteAccountMutation = `
    mutation deleteAccount($password: deleteAccountInput!) {
    deleteAccount (
        password: $password
    ) {
        success
        message
    }
}
`;

export const customerLogoutMutation = `
    mutation customerLogout {
    customerLogout {
        success
        message
    }
}
`;

export const customerAccountInfoQuery = `
    query accountInfo {
    accountInfo {
        id
        firstName
        lastName
        name
        gender
        dateOfBirth
        email
        phone
        image
        imageUrl
        status
        password
        apiToken
        customerGroupId
        channelId
        subscribedToNewsLetter
        isVerified
        isSuspended
        token
        rememberToken
        createdAt
        updatedAt
        customerGroup {
            id
            code
            name
            isUserDefined
            createdAt
            updatedAt
        }
        addresses {
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            country
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
        }
        defaultAddress {
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            country
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
        }
        invoices {
            id
            incrementId
            state
            emailSent
            totalQty
            baseCurrencyCode
            channelCurrencyCode
            orderCurrencyCode
            subTotal
            baseSubTotal
            grandTotal
            baseGrandTotal
            shippingAmount
            baseShippingAmount
            taxAmount
            baseTaxAmount
            discountAmount
            baseDiscountAmount
            shippingTaxAmount
            baseShippingTaxAmount
            subTotalInclTax
            baseSubTotalInclTax
            shippingAmountInclTax
            baseShippingAmountInclTax
            orderId
            transactionId
            reminders
            nextReminderAt
            createdAt
            updatedAt
            formattedPrice {
                subTotal
                baseSubTotal
                grandTotal
                baseGrandTotal
                shippingAmount
                baseShippingAmount
                taxAmount
                baseTaxAmount
                discountAmount
                baseDiscountAmount
                shippingTaxAmount
                baseShippingTaxAmount
                subTotalInclTax
                baseSubTotalInclTax
                shippingAmountInclTax
                baseShippingAmountInclTax
            }
            order {
                id
            }
            items {
                id
            }
            customer {
                id
            }
            channel {
                id
            }
        }
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
            # product {
            #     id
            # }
            channel {
                id
            }
            customer {
                id
            }
        }
        isWishlistShared
        getWishlistSharedLink
        allCarts {
            id
            customerEmail
            customerFirstName
            customerLastName
            shippingMethod
            couponCode
            isGift
            itemsCount
            itemsQty
            exchangeRate
            globalCurrencyCode
            baseCurrencyCode
            channelCurrencyCode
            cartCurrencyCode
            grandTotal
            baseGrandTotal
            subTotal
            baseSubTotal
            taxTotal
            baseTaxTotal
            discountAmount
            baseDiscountAmount
            shippingAmount
            baseShippingAmount
            shippingAmountInclTax
            baseShippingAmountInclTax
            subTotalInclTax
            baseSubTotalInclTax
            checkoutMethod
            isGuest
            isActive
            appliedCartRuleIds
            customerId
            channelId
            createdAt
            updatedAt
            formattedPrice {
                grandTotal
                baseGrandTotal
                subTotal
                baseSubTotal
                taxTotal
                baseTaxTotal
                discount
                baseDiscount
                discountedSubTotal
                baseDiscountedSubTotal
                shippingAmount
                baseShippingAmount
                shippingAmountInclTax
                baseShippingAmountInclTax
                subTotalInclTax
                baseSubTotalInclTax
            }
            items {
                id
            }
            allItems {
                id
            }
            billingAddress {
                id
            }
            shippingAddress {
                id
            }
            #shippingRates
            selectedShippingRate {
                id
                carrier
                carrierTitle
                method
                methodTitle
                methodDescription
                price
                basePrice
                discountAmount
                baseDiscountAmount
                isCalculateTax
                cartAddressId
                createdAt
                updatedAt
                shippingAddress {
                    id
                }
                formattedPrice {
                    price
                    basePrice
                }
            }
            payment {
                id
                method
                methodTitle
                cartId
                createdAt
                updatedAt
            }
            status
        }
        inactiveCarts {
            id
        }
        activeCarts {
            id
        }
        orders {
            id
            incrementId
            status
            channelName
            isGuest
            customerEmail
            customerFirstName
            customerLastName
            shippingMethod
            shippingTitle
            shippingDescription
            couponCode
            isGift
            totalItemCount
            totalQtyOrdered
            baseCurrencyCode
            channelCurrencyCode
            orderCurrencyCode
            grandTotal
            baseGrandTotal
            grandTotalInvoiced
            baseGrandTotalInvoiced
            grandTotalRefunded
            baseGrandTotalRefunded
            subTotal
            baseSubTotal
            subTotalInvoiced
            baseSubTotalInvoiced
            subTotalRefunded
            baseSubTotalRefunded
            discountPercent
            discountAmount
            baseDiscountAmount
            discountInvoiced
            baseDiscountInvoiced
            discountRefunded
            baseDiscountRefunded
            taxAmount
            baseTaxAmount
            taxAmountInvoiced
            baseTaxAmountInvoiced
            taxAmountRefunded
            baseTaxAmountRefunded
            shippingAmount
            baseShippingAmount
            shippingInvoiced
            baseShippingInvoiced
            shippingRefunded
            baseShippingRefunded
            shippingDiscountAmount
            baseShippingDiscountAmount
            shippingTaxAmount
            baseShippingTaxAmount
            shippingTaxRefunded
            baseShippingTaxRefunded
            subTotalInclTax
            baseSubTotalInclTax
            shippingAmountInclTax
            baseShippingAmountInclTax
            customerId
            customerType
            channelId
            channelType
            cartId
            appliedCartRuleIds
            createdAt
            updatedAt
            formattedPrice {
                grandTotal
                baseGrandTotal
                grandTotalInvoiced
                baseGrandTotalInvoiced
                grandTotalRefunded
                baseGrandTotalRefunded
                subTotal
                baseSubTotal
                subTotalInvoiced
                baseSubTotalInvoiced
                subTotalRefunded
                discountAmount
                baseDiscountAmount
                discountInvoiced
                baseDiscountInvoiced
                discountRefunded
                baseDiscountRefunded
                taxAmount
                baseTaxAmount
                taxAmountInvoiced
                baseTaxAmountInvoiced
                taxAmountRefunded
                baseTaxAmountRefunded
                shippingAmount
                baseShippingAmount
                shippingInvoiced
                baseShippingInvoiced
                shippingRefunded
                baseShippingRefunded
                shippingDiscountAmount
                baseShippingDiscountAmount
                shippingTaxAmount
                baseShippingTaxAmount
                shippingTaxRefunded
                baseShippingTaxRefunded
                subTotalInclTax
                baseSubTotalInclTax
                shippingAmountInclTax
                baseShippingAmountInclTax
            }
            items {
                id
            }
            comments {
                id
                orderId
                comment
                customerNotified
                createdAt
                updatedAt
                order {
                    id
                }
            }
            downloadableLinkPurchased {
                id
                productName
                name
                url
                file
                fileName
                type
                downloadBought
                downloadUsed
                status
                customerId
                orderId
                orderItemId
                downloadCanceled
                createdAt
                updatedAt
                customer {
                    id
                }
                order {
                    id
                }
                orderItem {
                    id
                }
            }
            shipments {
                id
                status
                totalQty
                totalWeight
                carrierCode
                carrierTitle
                trackNumber
                emailSent
                customerId
                customerType
                orderId
                orderAddressId
                inventorySourceId
                inventorySourceName
                createdAt
                updatedAt
                order {
                    id
                }
                items {
                    id
                }
                inventorySource {
                    id
                }
                customer {
                    id
                }
                address {
                    id
                }
            }
            invoices {
                id
            }
            refunds {
                id
            }
            customer {
                id
            }
            addresses {
                id
            }
            payment {
                id
            }
            billingAddress {
                id
            }
            shippingAddress {
                id
            }
            channel {
                id
            }
        }
        reviews {
            id
            name
            title
            rating
            comment
            status
            productId
            customerId
            createdAt
            updatedAt
            customer {
                id
            }
            #product
            images {
                id
                reviewId
                type
                mimeType
                path
                url
                review {
                    id
                }
            }
        }
        notes {
            id
            customerId
            note
            customerNotified
            createdAt
            updatedAt
            customer {
                id
            }
        }
        subscription {
            id
            email
            isSubscribed
            token
            customerId
            channelId
            createdAt
            updatedAt
        }
    }
}
`;


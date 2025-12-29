export const CustomerCreateOrderMutation = `
    mutation createOrder($customerId: ID!) {
    createOrder(customerId: $customerId) {
        success
        jumpToSection
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
            }
            items {
                id
                quantity
                sku
                type
                name
                couponCode
                weight
                totalWeight
                baseTotalWeight
                price
                basePrice
                customPrice
                total
                baseTotal
                taxPercent
                taxAmount
                baseTaxAmount
                discountPercent
                discountAmount
                baseDiscountAmount
                parentId
                productId
                cartId
                taxCategoryId
                appliedCartRuleIds
                #additional
                createdAt
                updatedAt
                formattedPrice {
                    price
                    basePrice
                    customPrice
                    total
                    baseTotal
                    taxAmount
                    baseTaxAmount
                    discountAmount
                    baseDiscountAmount
                }
                #product
                cart {
                    id
                }
                child {
                    id
                }
                parent {
                    id
                }
            }
            allItems  {
                id
                quantity
                sku
                type
                name
                couponCode
                weight
                totalWeight
                baseTotalWeight
                price
                basePrice
                customPrice
                total
                baseTotal
                taxPercent
                taxAmount
                baseTaxAmount
                discountPercent
                discountAmount
                baseDiscountAmount
                parentId
                productId
                cartId
                taxCategoryId
                appliedCartRuleIds
                #additional
                createdAt
                updatedAt
                formattedPrice {
                    price
                    basePrice
                    customPrice
                    total
                    baseTotal
                    taxAmount
                    baseTaxAmount
                    discountAmount
                    baseDiscountAmount
                }
                #product
                cart {
                    id
                }
                child {
                    id
                }
                parent {
                    id
                }
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
        }
    }
}
`;
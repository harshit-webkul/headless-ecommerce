export const addItemToCartMutation = `
    mutation addItemToCart($input: AddItemToCartInput! ) {
    addItemToCart(input: $input) {
        success
        message
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
            appliedTaxRates {
                taxName
                totalAmount
            }
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
                priceInclTax
                basePriceInclTax
                totalInclTax
                baseTotalInclTax
                parentId
                productId
                cartId
                taxCategoryId
                appliedCartRuleIds
                additional
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
                    priceInclTax
                    basePriceInclTax
                    totalInclTax
                    baseTotalInclTax
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
                additional
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

export const updateItemsToCartMutation = `
    mutation updateItemToCart($input: UpdateItemToCartInput!) {
    updateItemToCart(input: $input) {
        success
        message
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
            appliedTaxRates {
                taxName
                totalAmount
            }
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
                priceInclTax
                basePriceInclTax
                totalInclTax
                baseTotalInclTax
                parentId
                productId
                cartId
                taxCategoryId
                appliedCartRuleIds
                additional
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
                    priceInclTax
                    basePriceInclTax
                    totalInclTax
                    baseTotalInclTax
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
                additional
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

export const cartDetailQuery = `
    query cartDetail {
    cartDetail {
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
        appliedTaxRates {
            taxName
            totalAmount
        }
        formattedPrice {
            grandTotal
            baseGrandTotal
            subTotal
            baseSubTotal
            taxTotal
            baseTaxTotal
            discountAmount
            baseDiscountAmount
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
            priceInclTax
            basePriceInclTax
            totalInclTax
            baseTotalInclTax
            parentId
            productId
            cartId
            taxCategoryId
            appliedCartRuleIds
            additional
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
                priceInclTax
                basePriceInclTax
                totalInclTax
                baseTotalInclTax
            }
            product {
                customizableOptions {
                    id
                    label
                    productId
                    type
                    isRequired
                    # maxCharacters
                    supportedFileExtensions
                    sortOrder
                    product {
                        id
                    }
                    translations {
                        id
                        locale
                        label
                        productCustomizableOptionId
                    }
                    customizableOptionPrices {
                        id
                        isDefault
                        isUserDefined
                        label
                        price
                        productCustomizableOptionId
                        qty
                        sortOrder
                    }
                }
            }
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
`;

export const cartItemsQuery = `
    query cartItems {
    cartItems {
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
        priceInclTax
        basePriceInclTax
        totalInclTax
        baseTotalInclTax
        parentId
        productId
        cartId
        taxCategoryId
        appliedCartRuleIds
        additional
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
            priceInclTax
            basePriceInclTax
            totalInclTax
            baseTotalInclTax
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
}
`;

export const moveToWishlistMutation = `
    mutation moveToWishlist($id: ID!) {
    moveToWishlist (
        id: $id
    ) {
        success
        message
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
            appliedTaxRates {
                taxName
                totalAmount
            }
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
                priceInclTax
                basePriceInclTax
                totalInclTax
                baseTotalInclTax
                parentId
                productId
                cartId
                taxCategoryId
                appliedCartRuleIds
                additional
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
                    priceInclTax
                    basePriceInclTax
                    totalInclTax
                    baseTotalInclTax
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
                additional
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

export const removeCartIteMutation = `
    mutation removeCartItem ($id: ID!) {
    removeCartItem (
        id: $id
    ) {
        success
        message
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
            appliedTaxRates {
                taxName
                totalAmount
            }
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
                additional
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
                    priceInclTax
                    basePriceInclTax
                    totalInclTax
                    baseTotalInclTax
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
                additional
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

export const removeAllCartItemsMutation= `
    mutation removeAllCartItem {
    removeAllCartItem {
        success
        message
    }
}
`;

export const getSlotsQuery = `
    query getSlots($id: ID! , $date: String!) {
    getSlots (
        id: $id
        date: $date
    ) {
        from
        to
        timestamp
        
        time
        slots {
            from
            to
            fromTimestamp
            toTimestamp
            qty
        }

    }
}
`;


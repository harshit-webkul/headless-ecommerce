export const createCartRuleMutation =  `
    mutation createCartRule ($input: CreateCartRuleInput!){
    createCartRule(input: $input) {
        success
        message
        cartRule {
            id
            name
            description
            startsFrom
            endsTill
            status
            couponType
            useAutoGeneration
            usagePerCustomer
            usesPerCoupon
            timesUsed
            conditionType
            conditions
            endOtherRules
            usesAttributeConditions
            actionType
            discountAmount
            discountQuantity
            discountStep
            applyToShipping
            freeShipping
            sortOrder
            createdAt
            updatedAt
            channels {
                id
                code
                name
            }
            customerGroups {
                id
                code
                name
            }
            coupon {
                id
                code
                usageLimit
                usagePerCustomer
                timesUsed
                type
                isPrimary
                expiredAt
                cartRuleId
                createdAt
                updatedAt
                cartRule {
                    id
                }
                couponUsage {
                    id
                    timesUsed
                    cartRuleCouponId
                    customerId
                }
            }
        }
    }
}
`;
export const getAllCartRuleMutation = `
    query cartRules ($first : Int, $page: Int){
    cartRules ( 
        first: $first
        page: $page
        ){
        paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data {
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
            coupons {
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
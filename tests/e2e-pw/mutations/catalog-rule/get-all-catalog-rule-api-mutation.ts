export const getAllCatalogRulesMutation = `
    query catalogRules ($first: Int, $page: Int){
    catalogRules (
        first: $first
        page: $page
    ) {
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
            conditionType
            conditions
            endOtherRules
            actionType
            discountAmount
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
        }
    }
}
`;
export const createCatalogRuleMutation = `
    mutation createCatalogRule ($input: CreateCatalogRuleInput!) {
    createCatalogRule(input: $input) {
        success
        message
        catalogRule {
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
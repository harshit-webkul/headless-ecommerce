export const getParticularCatalogRuleMutation = `
    query catalogRule ($id: ID!) {
    catalogRule(id: $id) {
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

`;
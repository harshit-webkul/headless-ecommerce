export const updateCatalogRuleMutation = `
    mutation updateCatalogRule {
    updateCatalogRule(id: 2, input: {
        name: "First Catalog Rule Update"
        status: false
        description: "First Catalog Rule 10% off update"
        channels: [1]
        customerGroups: [1, 2]
        startsFrom: "2021-11-25 13:43:32"
        endsTill: "2021-12-30 13:43:32"
        conditionType: 1
        conditions: [{
            attribute: "product|category_ids",
            operator: "{}",
            attributeType: "multiselect",
            value: ["1", "3"]
        },	{
            attribute: "product|sku",
            operator: "==",
            attributeType: "text",
            value: ["phone"]
        },	{
            attribute: "product|weight",
            operator: "==",
            attributeType: "text",
            value: ["1.5"]
        }]
        sortOrder: 0
        actionType: "by_percent"
        discountAmount: 5.8
        endOtherRules: false
    }) {
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
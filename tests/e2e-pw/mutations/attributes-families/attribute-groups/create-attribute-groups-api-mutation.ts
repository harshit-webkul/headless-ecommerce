export const createAttributeGroupsMutation = `
    mutation createAttributeGroup($input: CreateAttributeGroupInput!) {
    createAttributeGroup(input: $input) {
        success
        message
        attributeGroup {
            id
            name
            position
            isUserDefined
            attributeFamilyId
            customAttributes {
                id
                code
                adminName
                type
                position
                isRequired
                isUnique
                validation
                valuePerLocale
                valuePerChannel
                isFilterable
                isConfigurable
                isVisibleOnFront
                isUserDefined
                swatchType
                isComparable
                options {
                    id
                    adminName
                    swatchValue
                    sortOrder
                    attributeId
                    attribute {
                        id
                        adminName
                    }
                    translations {
                        id
                        locale
                        label
                        attributeOptionId
                    }
                }
                translations {
                    id
                    locale
                    name
                    attributeId
                }
            }
        }
    }
}
`;

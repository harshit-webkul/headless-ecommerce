export const createAttributeMutation = `
    mutation createAttribute($input: CreateAttributeInput!) {
        createAttribute(input: $input) {
            success
            message
            attribute {
                id
                code
                adminName
                type
                position
                defaultValue
                isRequired
                isUnique
                validation
                valuePerLocale
                valuePerChannel
                isFilterable
                isConfigurable
                isVisibleOnFront
                isComparable
                translations {
                    id
                    locale
                    name
                    attributeId
                }
            }
        }
    }
`;

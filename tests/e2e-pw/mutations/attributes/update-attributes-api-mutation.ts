export const updateAttributesMutation = `
mutation UpdateAttribute($id: ID!, $input: CreateAttributeInput!) {
  updateAttribute(id: $id, input: $input) {
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
}`;

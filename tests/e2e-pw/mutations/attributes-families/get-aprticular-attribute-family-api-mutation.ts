export const getParticularAttributeFamilyMutation = `
    query attributeFamily ($id : ID!){
	attributeFamily(id: $id) {
        id
        code
        name
        status
        isUserDefined
        attributeGroups {
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
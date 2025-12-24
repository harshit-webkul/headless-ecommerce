export const getAllAttributesMutation = `
query getAllAttributes {
  attributes(
    first: 11
    page: 1
  ) {
    paginatorInfo {
        count
        currentPage
        lastPage
        total
    }
    data {
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
`;

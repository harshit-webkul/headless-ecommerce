export const getAllAttributeOptionsMutation = `
    query attributeOptions {
	    attributeOptions {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
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
        }
    }
`;


export const getParticularAttributeOptionsMutation = `
    query attributeOption($id: ID!) {
	attributeOption(id: $id) {
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
}

`
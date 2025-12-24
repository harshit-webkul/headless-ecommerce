export const updateCategoryMutation = `
mutation UpdateCategory($id: ID!, $input: CreateCategoryInput!) {
  updateCategory(id: $id, input: $input) {
    success
        message
        category {
            id
            position
            logoPath
            logoUrl
            status
            displayMode
            lft
            rgt
            parentId
            additional
            bannerPath
            bannerUrl
            name
            slug
            urlPath
            description
            metaTitle
            metaDescription
            metaKeywords
            localeId
            createdAt
            updatedAt
            filterableAttributes {
                id
                code
                adminName
                type
                position
            }
            children {
                id
                position
                logoPath
                logoUrl
                status
                displayMode
                lft
                rgt
                parentId
                additional
                bannerPath
                bannerUrl
                name
                slug
                urlPath
                description
                metaTitle
                metaDescription
                metaKeywords
                localeId
                createdAt
                updatedAt
            }
        }
    }
}`;

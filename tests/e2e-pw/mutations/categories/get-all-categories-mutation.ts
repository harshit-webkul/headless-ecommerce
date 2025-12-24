export const getCategoriesMutation = `
    query categories($slug: String) {
        categories(
        first: 11
        page: 1
            input: {
              slug: $slug
            }
        ) {
        paginatorInfo {
        count
        currentPage
        lastPage
        total
        }
        data {
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

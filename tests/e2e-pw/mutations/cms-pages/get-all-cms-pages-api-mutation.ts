export const getAllCMSpagesMutation = `
    query cmsPages ($first: Int, $page: Int){
    cmsPages (
        first: $first
        page: $page
    ) {
        paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data {
            id
            layout
            createdAt
            updatedAt
            channels {
                id
                code
                name
            }
            translations {
                id
                urlKey
                metaDescription
                metaTitle
                pageTitle
                metaKeywords
                htmlContent
                locale
                cmsPageId
            }
        }
    }
}
`;
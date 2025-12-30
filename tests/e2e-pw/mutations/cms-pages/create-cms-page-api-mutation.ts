export const createCmsPageMutation = `
    mutation createCmsPage ($input : CreateCmsPageInput!) {
    createCmsPage(
        input: $input
    ) {
        success
        message
        page {
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
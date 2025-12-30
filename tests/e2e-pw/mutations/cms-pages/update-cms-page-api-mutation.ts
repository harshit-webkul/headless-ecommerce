export const updateCMSpageMutation = `
    mutation updateCmsPage ($id: ID!, $input: CreateCmsPageInput!){
    updateCmsPage(
        id: $id
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
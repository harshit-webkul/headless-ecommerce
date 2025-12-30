export const getParticularCMSpageMutation = `
    query cmsPage ($id : ID!) {
    cmsPage(
        id: $id
    ) {
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
`;
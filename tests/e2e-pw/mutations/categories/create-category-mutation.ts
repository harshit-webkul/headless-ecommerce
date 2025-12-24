export const createCategoryMutation = `
mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
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

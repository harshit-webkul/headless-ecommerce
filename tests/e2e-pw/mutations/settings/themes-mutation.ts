// mutations/settings/themes-mutation.ts

export const createThemeMutation = `
    mutation createTheme($input: CreateThemeInput!) {
        createTheme(input: $input) {
            success
            message
            theme {
                id
                themeCode
                type
                name
                sortOrder
                status
                channelId
                createdAt
                updatedAt
            }
        }
    }
`;

export const updateThemeMutation = `
    mutation updateTheme($id: ID!, $input: UpdateThemeInput!) {
        updateTheme(id: $id, input: $input) {
            success
            message
            theme {
                id
                themeCode
                type
                name
                sortOrder
                status
                channelId
                createdAt
                updatedAt
                translations {
                    id
                    themeCustomizationId
                    localeCode
                    options {
                        title
                        css
                        html
                        images {
                            link
                            image
                            title
                            imageUrl
                        }
                        filters {
                            value
                            key
                        }
                        column_1 {
                            url
                            title
                            sortOrder
                        }
                        column_2 {
                            url
                            title
                            sortOrder
                        }
                        column_3 {
                            url
                            title
                            sortOrder
                        }
                    }
                }
            }
        }
    }
`;

export const deleteThemeMutation = `
    mutation deleteTheme($id: ID!) {
        deleteTheme(id: $id) {
            success
            message
        }
    }
`;

export const getThemesQuery = `
    query themes($first: Int, $page: Int, $input: FilterThemeInput) {
        themes(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
                id
                themeCode
                type
                name
                sortOrder
                status
                channelId
                createdAt
                updatedAt
                translations {
                    id
                    themeCustomizationId
                    localeCode
                    options {
                        title
                        css
                        html
                        images {
                            link
                            image
                            title
                            imageUrl
                        }
                        filters {
                            value
                            key
                        }
                        column_1 {
                            url
                            title
                            sortOrder
                        }
                        column_2 {
                            url
                            title
                            sortOrder
                        }
                        column_3 {
                            url
                            title
                            sortOrder
                        }
                    }
                }
            }
        }
    }
`;

export const getThemeQuery = `
    query theme($id: ID!) {
        theme(id: $id) {
            id
            themeCode
            type
            name
            sortOrder
            status
            channelId
            createdAt
            updatedAt
            translations {
                id
                themeCustomizationId
                localeCode
                options {
                    title
                    css
                    html
                    images {
                        link
                        image
                        title
                        imageUrl
                    }
                    filters {
                        value
                        key
                    }
                    column_1 {
                        url
                        title
                        sortOrder
                    }
                    column_2 {
                        url
                        title
                        sortOrder
                    }
                    column_3 {
                        url
                        title
                        sortOrder
                    }
                }
            }
        }
    }
`;
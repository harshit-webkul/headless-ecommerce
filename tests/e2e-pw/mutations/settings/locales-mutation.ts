export const createLocaleMutation = `
    mutation createLocale($input: CreateLocaleInput!) {
        createLocale(input: $input) {
            success
            message
            locale {
                id
                code
                name
                direction
                logoUrl
                createdAt
                updatedAt
            }
        }
    }
`;

export const updateLocaleMutation = `
    mutation updateLocale($id: ID!, $input: CreateLocaleInput!) {
        updateLocale(id: $id, input: $input) {
            success
            message
            locale {
                id
                code
                name
                direction
                logoUrl
                createdAt
                updatedAt
            }
        }
    }
`;

export const deleteLocaleMutation = `
    mutation deleteLocale($id: ID!) {
        deleteLocale(id: $id) {
            success
            message
        }
    }
`;

export const getAllLocalesQuery = `
    query locales($first: Int, $page: Int, $input: FilterLocaleInput) {
        locales(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
                id
                code
                name
                direction
                logoUrl
                createdAt
                updatedAt
            }
        }
    }
`;

export const getParticularLocaleQuery = `
    query locale($id: ID!) {
        locale(id: $id) {
            id
            code
            name
            direction
            logoUrl
            createdAt
            updatedAt
        }
    }
`;
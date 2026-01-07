// mutations/settings/url-rewrites-mutation.ts

export const createUrlRewriteMutation = `
    mutation createUrlRewrite($input: UrlRewriteInput!) {
        createUrlRewrite(input: $input) {
            success
            message
            urlRewrite {
                id
                entityType
                requestPath
                targetPath
                redirectType
                locale
                createdAt
                updatedAt
            }
        }
    }
`;

export const updateUrlRewriteMutation = `
    mutation updateUrlRewrite($id: ID!, $input: UrlRewriteInput!) {
        updateUrlRewrite(id: $id, input: $input) {
            success
            message
            urlRewrite {
                id
                entityType
                requestPath
                targetPath
                redirectType
                locale
                createdAt
                updatedAt
            }
        }
    }
`;

export const deleteUrlRewriteMutation = `
    mutation deleteUrlRewrite($id: ID!) {
        deleteUrlRewrite(id: $id) {
            success
            message
        }
    }
`;

export const getUrlRewritesQuery = `
    query urlRewrites($first: Int, $page: Int, $input: FilterUrlRewriteInput) {
        urlRewrites(first: $first, page: $page, input: $input) {
            data {
            id
            entityType
            requestPath
            targetPath
            redirectType
            locale
            createdAt
            updatedAt
            }
        }
    }
`;

export const getUrlRewriteQuery = `
    query urlRewrite($id: ID!) {
        urlRewrite(id: $id) {
            id
            entityType
            requestPath
            targetPath
            redirectType
            locale
            createdAt
            updatedAt
        }
    }
`;

export const createSiteMapMutation = `
    mutation createSiteMap($input: CreateSiteMapInput!) {
    createSiteMap(input: $input) {
        success
        message
        sitemap {
            id
            fileName
            path
        }
    }
}
`;

export const updateSiteMapMutation = `
    mutation updateSiteMap ($id: ID!, $input: CreateSiteMapInput!) {
    updateSiteMap(id: $id, input: $input) {
        success
        message
        sitemap {
            id
            fileName
            path
        }
    }
}
`;
export const deleteSiteMapMutation = `
    mutation deleteSiteMap ($id: ID!) {
        deleteSiteMap (id: $id) {
            success
            message
        }
    }
`;

export const getSiteMapsQuery = `
    query sitemaps($first: Int, $page: Int, $input: FilterSiteMapInput ) {
        sitemaps(first: $first, page: $page, input: $input) {
            data {
                id
                fileName
                path
            }
        }
    }
`;

export const getSiteMapQuery = `
    query sitemap($id: ID!) {
        sitemap(id: $id) {
            id
            fileName
            path
        }
    }
`;

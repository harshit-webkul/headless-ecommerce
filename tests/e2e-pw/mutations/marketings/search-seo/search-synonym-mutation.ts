// mutations/settings/search-synonyms-mutation.ts

export const createSearchSynonymMutation = `
    mutation createSearchSynonym($input: SearchSynonymInput!) {
        createSearchSynonym(input: $input) {
            success
            message
            searchSynonym {
                id
                name
                terms
                createdAt
                updatedAt
            }
        }
    }
`;

export const updateSearchSynonymMutation = `
    mutation updateSearchSynonym($id: ID!, $input: SearchSynonymInput!) {
        updateSearchSynonym(id: $id, input: $input) {
            success
            message
            searchSynonym {
                id
                name
                terms
                createdAt
                updatedAt
            }
        }
    }
`;

export const deleteSearchSynonymMutation = `
    mutation deleteSearchSynonym($id: ID!) {
        deleteSearchSynonym(id: $id) {
            success
            message
        }
    }
`;

export const getSearchSynonymsQuery = `
    query searchSynonyms($first: Int, $page: Int, $input: FilterSearchTermInput) {
        searchSynonyms(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            
            data {
                id
                name
                terms
                createdAt
                updatedAt
            }
        }
    }
`;

export const getSearchSynonymQuery = `
    query searchSynonym($id: ID!) {
        searchSynonym(id: $id) {
            id
            name
            terms
            createdAt
            updatedAt
        }
    }
`;

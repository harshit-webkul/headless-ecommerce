// mutations/settings/search-terms-mutation.ts

export const createSearchTermMutation = `
    mutation createSearchTerm($input: CreateSearchTermInput!) {
        createSearchTerm(input: $input) {
            success
            message
            searchTerm {
                id
                term
                results
                uses
                redirectUrl
                displayInSuggestedTerms
                locale
                channelID
            }
        }
    }
`;

export const updateSearchTermMutation = `
    mutation updateSearchTerm($id: ID!, $input: UpdateSearchTermInput!) {
        updateSearchTerm(id: $id, input: $input) {
            success
            message
            searchTerm {
                id
                term
                results
                uses
                redirectUrl
                displayInSuggestedTerms
                locale
                channelID
            }
        }
    }
`;

export const deleteSearchTermMutation = `
    mutation deleteSearchTerm($id: ID!) {
        deleteSearchTerm(id: $id) {
            success
            message
        }
    }
`;

export const getSearchTermsQuery = `
    query searchTerms($first: Int, $page: Int, $input: FilterSearchTermInput) {
        searchTerms(first: $first, page: $page, input: $input) {
            data {
                id
                term
                results
                uses
                redirectUrl
                displayInSuggestedTerms
                locale
                channelID
            }
        }
    }
`;

export const getSearchTermQuery = `
    query searchTerm($id: ID!) {
        searchTerm(id: $id) {
            id
            term
            results
            uses
            redirectUrl
            displayInSuggestedTerms
            locale
            channelID
        }
    }
`;

// mutations/settings/exchange-rates-mutation.ts

export const createExchangeRateMutation = `
    mutation createExchangeRate($input: CreateExchangeRateInput!) {
        createExchangeRate(input: $input) {
            success
            message
            exchangeRate {
                id
                rate
                targetCurrency
            }
        }
    }
`;

export const updateExchangeRateMutation = `
    mutation updateExchangeRate($id: ID!, $input: CreateExchangeRateInput!) {
        updateExchangeRate(id: $id, input: $input) {
            success
            message
            exchangeRate {
                id
                rate
                targetCurrency
            }
        }
    }
`;

export const deleteExchangeRateMutation = `
    mutation deleteExchangeRate($id: ID!) {
        deleteExchangeRate(id: $id) {
            success
            message
        }
    }
`;

export const updateExchangeRatesMutation = `
    mutation updateExchangeRates {
        updateExchangeRates {
            success
            message
        }
    }
`;

export const getAllExchangeRatesQuery = `
    query exchangeRates($first: Int, $page: Int, $input: FilterExchangeRateInput) {
        exchangeRates(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
                id
                rate
                targetCurrency
                createdAt
                updatedAt
                currency {
                    id
                }
            }
        }
    }
`;

export const getParticularExchangeRateQuery = `
    query exchangeRate($id: ID!) {
        exchangeRate(id: $id) {
            id
            rate
            targetCurrency
            createdAt
            updatedAt
            currency {
                id
            }
        }
    }
`;
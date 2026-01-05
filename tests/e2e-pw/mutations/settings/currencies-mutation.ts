// mutations/settings/currencies-mutation.ts

export const createCurrencyMutation = `
    mutation createCurrency($input: CreateCurrencyInput!) {
        createCurrency(input: $input) {
            success
            message
            currency {
                id
                code
                name
                symbol
                decimal
                groupSeparator
                decimalSeparator
                currencyPosition
                createdAt
                updatedAt
            }
        }
    }
`;

export const updateCurrencyMutation = `
    mutation updateCurrency($id: ID!, $input: CreateCurrencyInput!) {
        updateCurrency(id: $id, input: $input) {
            success
            message
            currency {
                id
                code
                name
                symbol
                decimal
                groupSeparator
                decimalSeparator
                currencyPosition
                createdAt
                updatedAt
                exchangeRate {
                    id
                    targetCurrency
                    rate
                    createdAt
                    updatedAt
                    currency {
                        id
                    }
                }
            }
        }
    }
`;

export const deleteCurrencyMutation = `
    mutation deleteCurrency($id: ID!) {
        deleteCurrency(id: $id) {
            success
            message
        }
    }
`;

export const getAllCurrenciesQuery = `
    query currencies($first: Int, $page: Int, $input: FilterCurrencyInput) {
        currencies(first: $first, page: $page, input: $input) {
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
                symbol
                decimal
                groupSeparator
                decimalSeparator
                currencyPosition
                createdAt
                updatedAt
                exchangeRate {
                    id
                    targetCurrency
                    rate
                    createdAt
                    updatedAt
                    currency {
                        id
                    }
                }
            }
        }
    }
`;

export const getParticularCurrencyQuery = `
    query currency($id: ID!) {
        currency(id: $id) {
            id
            code
            name
            symbol
            decimal
            groupSeparator
            decimalSeparator
            currencyPosition
            createdAt
            updatedAt
            exchangeRate {
                id
                targetCurrency
                rate
                createdAt
                updatedAt
                currency {
                    id
                }
            }
        }
    }
`;
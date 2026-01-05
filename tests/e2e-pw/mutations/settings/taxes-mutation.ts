// mutations/settings/tax-mutation.ts

// Tax Rates Mutations
export const createTaxRateMutation = `
    mutation createTaxRate($input: CreateTaxRateInput!) {
        createTaxRate(input: $input) {
            success
            message
            taxRate {
                id
                identifier
                isZip
                zipCode
                zipFrom
                zipTo
                state
                country
                taxRate
                taxCategories {
                    id
                    code
                    name
                }
            }
        }
    }
`;

export const updateTaxRateMutation = `
    mutation updateTaxRate($id: ID!, $input: UpdateTaxRateInput!) {
        updateTaxRate(id: $id, input: $input) {
            success
            message
            taxRate {
                id
                identifier
                isZip
                zipCode
                zipFrom
                zipTo
                state
                country
                taxRate
                taxCategories {
                    id
                    code
                    name
                }
            }
        }
    }
`;

export const deleteTaxRateMutation = `
    mutation deleteTaxRate($id: ID!) {
        deleteTaxRate(id: $id) {
            success
            message
        }
    }
`;

// Tax Categories Mutations
export const createTaxCategoryMutation = `
    mutation createTaxCategory($input: CreateTaxCategoryInput!) {
        createTaxCategory(input: $input) {
            success
            message
            taxCategory {
                id
                code
                name
                description
                taxRates {
                    id
                    identifier
                    country
                    state
                    isZip
                    zipCode
                    zipFrom
                    zipTo
                    taxRate
                }
            }
        }
    }
`;

export const updateTaxCategoryMutation = `
    mutation updateTaxCategory($id: ID!, $input: UpdateTaxCategoryInput!) {
        updateTaxCategory(id: $id, input: $input) {
            success
            message
            taxCategory {
                id
                code
                name
                description
                taxRates {
                    id
                    identifier
                    country
                    state
                    isZip
                    zipCode
                    zipFrom
                    zipTo
                    taxRate
                }
            }
        }
    }
`;

export const deleteTaxCategoryMutation = `
    mutation deleteTaxCategory($id: ID!) {
        deleteTaxCategory(id: $id) {
            success
            message
        }
    }
`;

// Tax Queries
export const getTaxRatesQuery = `
    query taxRates($first: Int, $page: Int, $input: FilterTaxRateInput) {
        taxRates(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
                id
                identifier
                isZip
                zipCode
                zipFrom
                zipTo
                state
                country
                taxRate
                taxCategories {
                    id
                    code
                    name
                }
            }
        }
    }
`;

export const getTaxRateQuery = `
    query taxRate($id: ID!) {
        taxRate(id: $id) {
            id
            identifier
            isZip
            zipCode
            zipFrom
            zipTo
            state
            country
            taxRate
            taxCategories {
                id
                code
                name
            }
        }
    }
`;

export const getTaxCategoriesQuery = `
    query taxCategories($first: Int, $page: Int, $input: FilterTaxCategoryInput) {
        taxCategories(first: $first, page: $page, input: $input) {
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
                description
                taxRates {
                    id
                    identifier
                    country
                    state
                    isZip
                    zipCode
                    zipFrom
                    zipTo
                    taxRate
                }
            }
        }
    }
`;

export const getTaxCategoryQuery = `
    query taxCategory($id: ID!) {
        taxCategory(id: $id) {
            id
            code
            name
            description
            taxRates {
                id
                identifier
                country
                state
                isZip
                zipCode
                zipFrom
                zipTo
                taxRate
            }
        }
    }
`;
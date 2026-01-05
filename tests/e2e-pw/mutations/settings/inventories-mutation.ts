// mutations/settings/inventory-sources-mutation.ts

export const createInventorySourceMutation = `
    mutation createInventorySource($input: createInventorySourceInput!) {
        createInventorySource(input: $input) {
            success
            message
            inventorySource {
                id
                code
                name
                description
                contactName
                contactEmail
                contactNumber
                contactFax
                country
                state
                city
                street
                postcode
                priority
                latitude
                longitude
                status
                createdAt
                updatedAt
            }
        }
    }
`;

export const updateInventorySourceMutation = `
    mutation updateInventorySource($id: ID!, $input: createInventorySourceInput!) {
        updateInventorySource(id: $id, input: $input) {
            success
            message
            inventorySource {
                id
                code
                name
                description
                contactName
                contactEmail
                contactNumber
                contactFax
                country
                state
                city
                street
                postcode
                priority
                latitude
                longitude
                status
                createdAt
                updatedAt
            }
        }
    }
`;

export const deleteInventorySourceMutation = `
    mutation deleteInventorySource($id: ID!) {
        deleteInventorySource(id: $id) {
            success
            message
        }
    }
`;

export const getInventorySourcesQuery = `
    query inventorySources($first: Int, $page: Int, $input: FilterInventorySourceInput) {
        inventorySources(first: $first, page: $page, input: $input) {
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
                contactName
                contactEmail
                contactNumber
                contactFax
                country
                state
                city
                street
                postcode
                priority
                latitude
                longitude
                status
            }
        }
    }
`;

export const getInventorySourceQuery = `
    query inventorySource($id: ID!) {
        inventorySource(id: $id) {
            id
            code
            name
            description
            contactName
            contactEmail
            contactNumber
            contactFax
            country
            state
            city
            street
            postcode
            priority
            latitude
            longitude
            status
        }
    }
`;
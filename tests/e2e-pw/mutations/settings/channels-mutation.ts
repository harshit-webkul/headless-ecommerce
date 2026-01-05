// mutations/settings/channels-mutation.ts

export const createChannelMutation = `
    mutation createChannel($input: CreateChannelInput!) {
        createChannel(input: $input) {
            success
            message
            channel {
                id
                code
                name
                description
                timezone
                theme
                hostname
                logoUrl
                faviconUrl
                homeSeo {
                    metaTitle
                    metaKeywords
                    metaDescription
                }
                isMaintenanceOn
                allowedIps
                rootCategoryId
                defaultLocaleId
                baseCurrencyId
                createdAt
                updatedAt
                maintenanceModeText
                locales {
                    id
                    code
                    name
                    direction
                    logoUrl
                    createdAt
                    updatedAt
                }
                defaultLocale {
                    id
                    code
                    name
                    direction
                    logoUrl
                    createdAt
                    updatedAt
                }
                currencies {
                    id
                    code
                    name
                    symbol
                    decimal
                    createdAt
                    updatedAt
                }
                baseCurrency {
                    id
                    code
                    name
                    symbol
                    decimal
                    createdAt
                    updatedAt
                }
                inventorySources {
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
                rootCategory {
                    id
                }
            }
        }
    }
`;

export const updateChannelMutation = `
    mutation updateChannel($id: ID!, $input: UpdateChannelInput!) {
        updateChannel(id: $id, input: $input) {
            success
            message
            channel {
                id
                code
                name
                description
                timezone
                theme
                hostname
                logoUrl
                faviconUrl
                homeSeo {
                    metaTitle
                    metaKeywords
                    metaDescription
                }
                isMaintenanceOn
                allowedIps
                rootCategoryId
                defaultLocaleId
                baseCurrencyId
                createdAt
                updatedAt
                maintenanceModeText
                locales {
                    id
                    code
                    name
                    direction
                    logoUrl
                    createdAt
                    updatedAt
                }
                defaultLocale {
                    id
                    code
                    name
                    direction
                    logoUrl
                    createdAt
                    updatedAt
                }
                currencies {
                    id
                    code
                    name
                    symbol
                    decimal
                    createdAt
                    updatedAt
                }
                baseCurrency {
                    id
                    code
                    name
                    symbol
                    decimal
                    createdAt
                    updatedAt
                }
                inventorySources {
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
                rootCategory {
                    id
                }
            }
        }
    }
`;

export const deleteChannelMutation = `
    mutation deleteChannel($id: ID!) {
        deleteChannel(id: $id) {
            success
            message
        }
    }
`;

export const getChannelsQuery = `
    query channels($first: Int, $page: Int, $input: FilterChannelInput) {
        channels(first: $first, page: $page, input: $input) {
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
                timezone
                theme
                hostname
                logoUrl
                faviconUrl
                homeSeo {
                    metaTitle
                    metaKeywords
                    metaDescription
                }
                isMaintenanceOn
                allowedIps
                rootCategoryId
                defaultLocaleId
                baseCurrencyId
                createdAt
                updatedAt
                maintenanceModeText
                locales {
                    id
                    code
                    name
                    direction
                    logoUrl
                    createdAt
                    updatedAt
                }
                defaultLocale {
                    id
                    code
                    name
                    direction
                    logoUrl
                    createdAt
                    updatedAt
                }
                currencies {
                    id
                    code
                    name
                    symbol
                    decimal
                    createdAt
                    updatedAt
                }
                baseCurrency {
                    id
                    code
                    name
                    symbol
                    decimal
                    createdAt
                    updatedAt
                }
                inventorySources {
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
                rootCategory {
                    id
                }
            }
        }
    }
`;

export const getChannelQuery = `
    query channel($id: ID!) {
        channel(id: $id) {
            id
            code
            name
            description
            timezone
            theme
            hostname
            logoUrl
            faviconUrl
            homeSeo {
                metaTitle
                metaKeywords
                metaDescription
            }
            isMaintenanceOn
            allowedIps
            rootCategoryId
            defaultLocaleId
            baseCurrencyId
            createdAt
            updatedAt
            maintenanceModeText
            locales {
                id
                code
                name
                direction
                logoUrl
                createdAt
                updatedAt
            }
            defaultLocale {
                id
                code
                name
                direction
                logoUrl
                createdAt
                updatedAt
            }
            currencies {
                id
                code
                name
                symbol
                decimal
                createdAt
                updatedAt
            }
            baseCurrency {
                id
                code
                name
                symbol
                decimal
                createdAt
                updatedAt
            }
            inventorySources {
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
            rootCategory {
                id
            }
        }
    }
`;
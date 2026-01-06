// mutations/marketing/campaigns-mutation.ts

export const createCampaignMutation = `
    mutation createCampaign($input: CreateCampaignInput!) {
        createCampaign(input: $input) {
            success
            message
            campaign {
                id
                name
                subject 
                status
                channel {
                    id
                    code
                    name
                    description
                    theme
                    hostname
                    defaultLocaleId
                    baseCurrencyId
                    rootCategoryId
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
                    logoUrl
                }
                customerGroup {
                    id
                    name
                    code
                    isUserDefined
                    createdAt
                    updatedAt
                }
                emailTemplate{
                    id
                    name
                    content
                    status
                }
                event {
                    id
                    name
                    description
                    date
                }
            }
        }
    }
`;

export const updateCampaignMutation = `
    mutation updateCampaign($id: ID!, $input: CreateCampaignInput!) {
        updateCampaign(id: $id, input: $input) {
            success
            message
            campaign {
                id
                name
                subject 
                status
                channel {
                    id
                    code
                    name
                    description
                    theme
                    hostname
                    defaultLocaleId
                    baseCurrencyId
                    rootCategoryId
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
                    logoUrl
                }
                customerGroup {
                    id
                    name
                    code
                    isUserDefined
                    createdAt
                    updatedAt
                }
                emailTemplate{
                    id
                    name
                    content
                    status
                }
                event {
                    id
                    name
                    description
                    date
                }
            }
        }
    }
`;

export const deleteCampaignMutation = `
    mutation deleteCampaign($id: ID!) {
        deleteCampaign(id: $id) {
            success
            message
        }
    }
`;

export const getCampaignsQuery = `
    query campaigns($first: Int, $page: Int, $input: FilterCampaignInput) {
        campaigns(first: $first, page: $page, input: $input) {
            data {
            id
            name
            subject 
            status
            channel {
                id
                code
                name
                description
                theme
                hostname
                defaultLocaleId
                baseCurrencyId
                rootCategoryId
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
                logoUrl
            }
            customerGroup {
                id
                name
                code
                isUserDefined
                createdAt
                updatedAt
            }
            emailTemplate{
                id
                name
                content
                status
            }
            event{
                 id
                name
                description
                date
            }
        }
    }
}
`;

export const getCampaignQuery = `
    query campaign($id: ID!) {
        campaign(id: $id) {
            id
            name
            subject 
            status
            channel {
                id
                code
                name
                description
                theme
                hostname
                defaultLocaleId
                baseCurrencyId
                rootCategoryId
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
                logoUrl
            }
            customerGroup {
                id
                name
                code
                isUserDefined
                createdAt
                updatedAt
            }
            emailTemplate{
                id
                name
                content
                status
            }
            event {
                id
                name
                description
                date
            }
        }
    }
`;

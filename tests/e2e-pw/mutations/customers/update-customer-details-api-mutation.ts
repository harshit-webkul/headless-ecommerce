export const updateCustomerMutation = `
mutation updateCustomer($id: ID!, $input: CreateCustomerInput!) {
  updateCustomer(id: $id, input: $input) {
        success
        message
        customer {
            id
            firstName
            lastName
            name
            gender
            dateOfBirth
            email
            phone
            image
            imageUrl
            status
            password
            apiToken
            customerGroupId
            subscribedToNewsLetter
            isVerified
            isSuspended
            token
            notes {
                id
                customerId
                note
                customerNotified
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            customerGroup {
                id
                name
                code
                isUserDefined
                createdAt
                updatedAt
            }
            subscription {
                id
                email
                isSubscribed
                token
                customerId
                channelId
                createdAt
                updatedAt
            }
        }
    }
}`;

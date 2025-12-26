export const getParticularCustomerMutation = `
query getcustomer($id: ID!) {
  customer(id: $id) {
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
        apiToken
        customerGroupId
        channelId
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
`;

export const setDefaultAddressMutation = `
    mutation setAsDefaultAddress($id: ID!, $customerId: ID!) {
    setAsDefaultAddress(
        id: $id
        customerId: $customerId
    ) {
        success
        message
        address {
            id
            addressType
            parentAddressId
            useForShipping
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            country
            postcode
            email
            phone
            vatId
            defaultAddress
            createdAt
            updatedAt
        }
    }
}
`;
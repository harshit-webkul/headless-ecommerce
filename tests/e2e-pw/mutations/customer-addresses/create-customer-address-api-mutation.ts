export const CreateCustomerAddressMutation = `
    mutation createCustomerAddress($input: CreateCustomerAddressInput!) {
    createCustomerAddress(input: $input) {
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
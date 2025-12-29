export const updateCustomerAddressMutation = `
mutation updateCustomerAddress($id: ID!, $input: CreateCustomerAddressInput!) {
  updateCustomerAddress(id: $id, input: $input) {
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
}`;

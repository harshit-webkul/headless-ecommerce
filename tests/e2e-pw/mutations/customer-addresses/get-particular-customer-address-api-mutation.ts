export const getParticularCustomerAddressMutation = `
    query customerAddress ($id: ID!){
    customerAddress(id: $id) {
        id
        customerId
        companyName
        firstName
        lastName
        address
        country
        state
        city
        postcode
        phone
        vatId
        addressType
        defaultAddress
        createdAt
        updatedAt
    }
}
`;
export const deleteCustomerAddressMutation= `
mutation deleteCustomerAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
        success
    }
}
`;
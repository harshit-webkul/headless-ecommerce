export const deleteCustomerMutation= `
mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
        success
    }
}
`;
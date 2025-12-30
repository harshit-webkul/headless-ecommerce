export const deleteCustomerGroupMutation = `
    mutation deleteCustomerGroup ($id: ID!){
    deleteCustomerGroup(
        id: $id
    ) {
        success
        message
    }
}
`;
export const updateCustomerGroupMutation = `
mutation updateCustomerGroup($id: ID!, $input: CreateCustomerGroupInput!) {
    updateCustomerGroup(id: $id, input: $input) {
        success
        message
        customerGroup {
            id
            name
            code
            isUserDefined
            createdAt
            updatedAt
        }
    }
}
`;
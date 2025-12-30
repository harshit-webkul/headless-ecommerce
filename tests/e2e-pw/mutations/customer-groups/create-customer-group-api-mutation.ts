export const CreateCustomerGroupMutation= `
    mutation createCustomerGroup($input: CreateCustomerGroupInput!) {
    createCustomerGroup (input: $input) {
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
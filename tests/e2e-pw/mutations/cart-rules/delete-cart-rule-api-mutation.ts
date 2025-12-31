export const deleteCartRuleMutation = `
    mutation deleteCartRule ($id: ID!) {
    deleteCartRule(id: $id) {
        success
        message
    }
}
`;
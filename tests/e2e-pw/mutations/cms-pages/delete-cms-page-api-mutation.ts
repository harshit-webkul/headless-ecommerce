export const deleteCMSpageMutation = `
    mutation deleteCmsPage ($id: ID!) {
    deleteCmsPage(
        id: $id
    ) {
        success
        message
    }
}
`;
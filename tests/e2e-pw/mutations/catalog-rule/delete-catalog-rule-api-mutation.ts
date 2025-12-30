export const deleteCatalogRuleMutation = `
    mutation deleteCatalogRule ($id: ID!) {
    deleteCatalogRule(
        id: $id
    ) {
        success
        message
    }
}
`;
export const deleteEmailTemplateMutation = `
    mutation deleteEmailTemplate ($id: ID!){
    deleteEmailTemplate(id: $id) {
        success
        message
    }
}
`;
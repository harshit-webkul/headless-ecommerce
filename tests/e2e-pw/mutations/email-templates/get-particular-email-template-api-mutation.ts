export const getParticularEmailTemplateMutation = `
    query emailTemplates ($id: ID!){
    emailTemplate(id: $id) {
        id
        name
        content
        status
    }
}
`;
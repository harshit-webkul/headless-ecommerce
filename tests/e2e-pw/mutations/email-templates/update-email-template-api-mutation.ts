export const updateEmailTemaplateMutation = `
    mutation createEmailTemplate ($id: ID!, $input: CreateEmailTemplateInput!){
    updateEmailTemplate(id: $id, input: $input){
        success
        message
        emailTemplate {
            id
            name
            content
            status
        }
    }
}
`;
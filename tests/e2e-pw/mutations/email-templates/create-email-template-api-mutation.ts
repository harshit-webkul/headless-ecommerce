export const createEmailTemplateMutation = `
    mutation createEmailTemplate ($input: CreateEmailTemplateInput!){
    createEmailTemplate(input: $input) {
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
export const getAllEmailTemplatesMutation = `
    query emailTemplates ($first: Int, $page: Int){
    emailTemplates(
        first: $first
        page: $page
        ){
        data {
            id
            name
            content
            status
        }
    }
}
`;
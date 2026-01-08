export const UpdateCustomScriptMutation =  `
    mutation updateCustomScript ($input: CustomScriptInput!) {
    updateCustomScript (input: $input) {
        success
        message
        customScripts {
            css
            javascript
        }
    }
}
`;
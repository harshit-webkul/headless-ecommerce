export const deleteAttributeFamilyMutation = `
    mutation deleteAttributeFamily($id: ID!) {
        deleteAttributeFamily(id: $id) {
            success
            message
        }
    }
`;


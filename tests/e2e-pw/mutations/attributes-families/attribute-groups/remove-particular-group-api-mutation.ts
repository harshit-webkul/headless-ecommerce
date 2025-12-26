export const deleteAttributeGroupMutation = `
    mutation deleteAttributeGroup($id: ID!) {
        deleteAttributeGroup(id: $id) {
            success
            message
        }
    }
`;


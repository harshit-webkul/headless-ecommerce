export const deleteParticularAttributeMutation = `
    mutation deleteAttribute($id: ID!) {
        deleteAttribute(id: $id) {
            success
            message
        }
    }
`;

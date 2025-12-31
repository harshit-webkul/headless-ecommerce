export const deleteEventMutation =  `
    mutation deleteEvent ($id: ID!) {
    deleteEvent(id: $id) {
        success
        message
    }
}
`;
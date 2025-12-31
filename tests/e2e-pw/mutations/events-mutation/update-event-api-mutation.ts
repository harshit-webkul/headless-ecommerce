export const updateEventMutation = `
    mutation updateEvent ($id: ID!, $input: CreateEventInput!) {
    updateEvent(id: $id, input: $input) {
        success
        message
        event {
            id
            name
            description
            date
        }
    }
}
`;
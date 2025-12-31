export const createEventMutation =  `
    mutation createEvent ($input: CreateEventInput!) {
    createEvent (input: $input) {
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
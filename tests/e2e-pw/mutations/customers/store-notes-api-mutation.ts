export const customerStoreNotesMutation = `
mutation storeNotes($id: ID!, $input: CreateCustomerNoteInput!) {
    storeNotes(id: $id, input: $input) {
        success
        message
        note {
            id
            customerId
            note
            customerNotified
            createdAt
            updatedAt
        }
    }
}
`;
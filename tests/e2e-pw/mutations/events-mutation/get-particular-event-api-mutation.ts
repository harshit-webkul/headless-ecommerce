export const getParticularEventMutation = `
    query events ($id: ID!){
    event(id: $id) {
        id
        name
        description
        date
    }
}
`;
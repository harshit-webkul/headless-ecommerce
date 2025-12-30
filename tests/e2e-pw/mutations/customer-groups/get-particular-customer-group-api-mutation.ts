export const getParticularcustomerGroupMutation = `
    query customerGroup($id : ID!){
    customerGroup(
        id: $id
    ) {
        id
        name
        code
        isUserDefined
        createdAt
        updatedAt
    }
}
`;
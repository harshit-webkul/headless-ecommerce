export const getAllEventsMutation = `
    query events ($first: Int, $page: Int) {
    events (
        first: $first
        page: $page
    ){
        data {
            id
            name
            description
            date
        }
    }
}
`;
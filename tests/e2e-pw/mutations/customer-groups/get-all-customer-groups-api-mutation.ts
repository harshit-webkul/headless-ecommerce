export const getAllCustomerGroupsMutation = `
    query customerGroups ($first: Int, $page: Int){
    customerGroups (
        first: $first
        page: $page
    ) {
        paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data {
            id
            name
            code
            isUserDefined
            createdAt
            updatedAt
        }
    }
}
`;
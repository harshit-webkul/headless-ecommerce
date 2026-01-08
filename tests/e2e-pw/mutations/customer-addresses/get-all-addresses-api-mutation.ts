export const getAllAddessesMutation = `
    query customerAddresses($first: Int, $page: Int, $input: FilterCustomerAddressInput) {
	customerAddresses(
        first:$first
        page: $page
        input: $input
    ) {
        paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data {
            id
            customerId
            companyName
            firstName
            lastName
            address
            country
            state
            city
            postcode
            phone
            vatId
            addressType
            defaultAddress
            createdAt
            updatedAt
        }
    }
}
`;

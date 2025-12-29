export const getAllCustomerMutation = `
    query customers($first: Int, $page: Int) {
	customers(
        first:$first
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
            firstName
            lastName
            name
            gender
            dateOfBirth
            email
            phone
            image
            imageUrl
            status
            password
            apiToken
            customerGroupId
            channelId
            subscribedToNewsLetter
            isVerified
            isSuspended
            token
            notes {
                id
                customerId
                note
                customerNotified
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            customerGroup {
                id
                name
                code
                isUserDefined
                createdAt
                updatedAt
            }
            subscription {
                id
                email
                isSubscribed
                token
                customerId
                channelId
                createdAt
                updatedAt
            }
        }
    }
}
`;

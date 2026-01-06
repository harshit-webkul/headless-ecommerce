export const unSubscriberMutation = `
    mutation unSubscribe($id: ID!) {
        unSubscribe(id: $id) {
            success
            message
            subscriber {
                id
                email
                isSubscribed
                token
                channelId
                createdAt
                updatedAt
            }
        }
    }
`;

export const deleteSubscriberMutation = `
    mutation deleteSubscriber($id: ID!) {
        deleteSubscriber(id: $id) {
            success
            message
        }
    }
`;

export const getSubscribersQuery = `
    query getSubscribers($first: Int, $page: Int) {
        getSubscribers(first: $first, page: $page) {
            paginatorInfo {
            count
            currentPage
            lastPage
            total
            }
            data {
                id
                email
                isSubscribed
                token
                channelId
                createdAt
                updatedAt
            }
        }
    }
`;

export const getSubscriberQuery = `
    query getSubscriber($id: ID!) {
        getSubscriber(id: $id) {
            id
            email
            isSubscribed
            token
            channelId
            createdAt
            updatedAt
        }
    }
`;

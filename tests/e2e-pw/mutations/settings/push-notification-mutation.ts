// mutations/settings/push-notification-mutation.ts

export const createPushNotificationMutation = `
    mutation createPushNotification($input: CreatePushNotificationInput!) {
        createPushNotification(input: $input) {
            success
            message
            pushNotification {
                id
                image
                imageUrl
                type
                status
                productCategoryId
                createdAt
                updatedAt
                translations {
                    id
                    title
                    content
                    locale
                    channel
                    pushNotificationId
                }
            }
        }
    }
`;

export const updatePushNotificationMutation = `
    mutation updatePushNotification($id: ID!, $input: UpdatePushNotificationInput!) {
        updatePushNotification(id: $id, input: $input) {
            success
            message
            pushNotification {
                id
                image
                imageUrl
                type
                status
                productCategoryId
                createdAt
                updatedAt
                translations {
                    id
                    title
                    content
                    locale
                    channel
                    pushNotificationId
                }
            }
        }
    }
`;

export const deletePushNotificationMutation = `
    mutation deletePushNotification($id: ID!) {
        deletePushNotification(id: $id) {
            success
            message
        }
    }
`;

export const sendPushNotificationMutation = `
    mutation sendPushNotification($id: ID!) {
        sendPushNotification(id: $id) {
            success
            message
        }
    }
`;

export const getPushNotificationsQuery = `
    query pushNotifications($first: Int, $page: Int, $input: FilterPushNotificationInput) {
        pushNotifications(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
                id
                image
                imageUrl
                type
                status
                productCategoryId
                createdAt
                updatedAt
                translations {
                    id
                    title
                    content
                    locale
                    channel
                    pushNotificationId
                }
            }
        }
    }
`;

export const getPushNotificationQuery = `
    query pushNotification($id: ID!) {
        pushNotification(id: $id) {
            id
            image
            imageUrl
            type
            status
            productCategoryId
            createdAt
            updatedAt
            translations {
                id
                title
                content
                locale
                channel
                pushNotificationId
            }
        }
    }
`;
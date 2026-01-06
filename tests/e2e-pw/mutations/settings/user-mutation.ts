// mutations/settings/users-mutation.ts

export const createUserMutation = `
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            success
            message
            user {
                id
                name
                email
                password
                apiToken
                status
                roleId
                image
                rememberToken
                createdAt
                updatedAt
                role {
                    id
                    name
                    description
                    permissionType
                    permissions
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export const updateUserMutation = `
    mutation updateUser($id: ID!, $input: CreateUserInput!) {
        updateUser(id: $id, input: $input) {
            success
            message
            user {
                id
                name
                email
                password
                apiToken
                status
                roleId
                image
                rememberToken
                createdAt
                updatedAt
                role {
                    id
                    name
                    description
                    permissionType
                    permissions
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export const deleteUserMutation = `
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            success
            message
        }
    }
`;

export const getUsersQuery = `
    query users($first: Int, $page: Int, $input: FilterUserInput) {
        users(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
                id
                name
                email
                password
                apiToken
                status
                roleId
                image
                rememberToken
                createdAt
                updatedAt
                role {
                    id
                    name
                    description
                    permissionType
                    permissions
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export const getUserQuery = `
    query user($id: ID!) {
        user(id: $id) {
            id
            name
            email
            password
            apiToken
            status
            roleId
            image
            rememberToken
            createdAt
            updatedAt
            role {
                id
                name
                description
                permissionType
                permissions
                createdAt
                updatedAt
            }
        }
    }
`;
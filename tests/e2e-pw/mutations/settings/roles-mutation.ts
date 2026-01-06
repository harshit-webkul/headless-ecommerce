// mutations/settings/roles-mutation.ts

export const createRoleMutation = `
    mutation createRole($input: CreateRoleInput!) {
        createRole(input: $input) {
            success
            message
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

export const updateRoleMutation = `
    mutation updateRole($id: ID!, $input: CreateRoleInput!) {
        updateRole(id: $id, input: $input) {
            success
            message
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

export const deleteRoleMutation = `
    mutation deleteRole($id: ID!) {
        deleteRole(id: $id) {
            success
            message
        }
    }
`;

export const getRolesQuery = `
    query roles($first: Int, $page: Int, $input: FilterRoleInput) {
        roles(first: $first, page: $page, input: $input) {
            paginatorInfo {
                count
                currentPage
                lastPage
                total
            }
            data {
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

export const getRoleQuery = `
    query role($id: ID!) {
        role(id: $id) {
            id
            name
            description
            permissionType
            permissions
            createdAt
            updatedAt
        }
    }
`;

export const getAclPermissionsQuery = `
    query getAclPermissions {
        getAclPermissions {
            key
            name
            route
            sort
        }
    }
`;
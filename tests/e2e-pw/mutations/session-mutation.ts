export const loginMutation = `
        mutation userLogin($input: LoginInput!) {
          userLogin(input: $input) {
            success
            message
            accessToken
            tokenType
            expiresIn
            user {
            id
            name
            email
            password
            apiToken
            roleId
            image
            status
            createdAt
            updatedAt
            role {
                name
                description
                permissionType
                permissions
            }
          }
        }    
    }`;

export const logoutMutation = `
  mutation userLogout {
    userLogout {
      success
      message
    }
  }
`;
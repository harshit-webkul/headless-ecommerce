export const createCustomerAddress = `
    mutation createAddress (
    $input: AddressInput!
) {
    createAddress (
        input: $input
    ) {
        success
        message
        address {
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            stateName
            country
            countryName
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
      }
    }
}
`;

export const updateCustomerAddress = `
    mutation updateAddress (
    $input: AddressInput!, $id: ID!
) {
    updateAddress (
        id: $id
        input: $input
    ) {
        success
        message
        address {
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            stateName
            country
            countryName
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
       }
    }
}
`;

export const getParticularCustomerAddress = `
    query address ($id: ID!) {
    address (id: $id) {
        id
        addressType
        parentAddressId
        customerId
        cartId
        orderId
        firstName
        lastName
        gender
        companyName
        address
        city
        state
        stateName
        country
        countryName
        postcode
        email
        phone
        vatId
        defaultAddress
        useForShipping
        createdAt
        updatedAt
    }
}
`;

export const getAllAddresses =  `
    query addresses ($page: Int!, $first: Int!, $input: FilterCustomerAddressInput ) {
    addresses (
        page: $page
        first: $first
        input: $input) {
        paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data { 
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            stateName
            country
            countryName
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
        }
    }
}
`;

export const setDefaultAddress = `
    mutation setDefaultAddress ($id: ID!) {
    setDefaultAddress (
        id: $id
    ) {
        success
        message
        address {
            id
            addressType
            parentAddressId
            customerId
            cartId
            orderId
            firstName
            lastName
            gender
            companyName
            address
            city
            state
            country
            postcode
            email
            phone
            vatId
            defaultAddress
            useForShipping
            createdAt
            updatedAt
        }
    }
}
`;

export const deleteCustomerAddress = `
    mutation deleteAddress ($id: ID!) {
    deleteAddress (id: $id) {
        success
        message
    }
}
`;
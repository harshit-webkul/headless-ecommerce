export const createReviewMutation = `
    mutation createReview ($input: CreateReviewInput!) {
    createReview (
        input: $input) {
        success
        message
        review {
            id
            title
            rating
            comment
            status
            createdAt
            updatedAt
            productId
            customerId
            customer {
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
                subscribedToNewsLetter
                isVerified
                isSuspended
                token
                rememberToken
                createdAt
                updatedAt
                customerGroup {
                    id
                    code
                    name
                    isUserDefined
                    createdAt
                    updatedAt
                }
            }
            images{
                id
                reviewId
                type
                mimeType
                path
                url
            }
            product {
                id
                sku
                type
                parentId
                attributeFamilyId
                productNumber
                name
                shortDescription
                description
                urlKey
                shareURL
                new
                featured
                status
                guestCheckout
                visibleIndividually
                metaTitle
                metaKeywords
                metaDescription
                price
                specialPrice
                specialPriceFrom
                specialPriceTo
                weight
                parentId
                attributeFamilyId
                createdAt
                updatedAt
            }
        }
    }
}
`;

export const getParticularReviewDetailMutation = `
    query reviewDetail($id: ID!) {
    reviewDetail (id: $id) {
        id
        title
        rating
        comment
        status
        images {
            id
            reviewId
            type
            mimeType
            path
            url
            review {
                id
            }
        }
        productId
        customerId
        createdAt
        updatedAt
        customer {
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
            subscribedToNewsLetter
            isVerified
            isSuspended
            token
            rememberToken
            createdAt
            updatedAt
            customerGroup {
                id
                code
                name
                isUserDefined
                createdAt
                updatedAt
            }
        }
        product {
            id
            type
            attributeFamilyId
            sku
            name
            parentId
            createdAt
            updatedAt
        }
    }
}
`;

export const getReviewListQuery = `
    query reviewsList($input: FilterReviewInput) {
    reviewsList (
        input: $input) {
        paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data {
            id
            title
            rating
            comment
            status
            images {
                id
                reviewId
                type
                mimeType
                path
                url
                review {
                    id
                }
            }
            productId
            customerId
            createdAt
            updatedAt
            customer {
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
                subscribedToNewsLetter
                isVerified
                isSuspended
                token
                rememberToken
                createdAt
                updatedAt
                customerGroup {
                    id
                    code
                    name
                    isUserDefined
                    createdAt
                    updatedAt
                }
            }
            product {
                id
                type
                attributeFamilyId
                sku
                parentId
                name
                sku
                createdAt
                updatedAt
            }
        }
    }
}
`;

export const deleteReviewMutation = `
    mutation deleteReview($id: ID!) {
    deleteReview (id: $id) {
        success
        message
        reviews {
            id
            title
            rating
            comment
            status
            createdAt
            updatedAt
            productId
            customerId
            customer {
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
                subscribedToNewsLetter
                isVerified
                isSuspended
                token
                rememberToken
                createdAt
                updatedAt
                customerGroup {
                    id
                    code
                    name
                    isUserDefined
                    createdAt
                    updatedAt
                }
            }
            product {
                id
                sku
                type
                parentId
                attributeFamilyId
                productNumber
                name
                shortDescription
                description
                urlKey
                shareURL
                new
                featured
                status
                guestCheckout
                visibleIndividually
                metaTitle
                metaKeywords
                metaDescription
                price
                specialPrice
                specialPriceFrom
                specialPriceTo
                weight
                parentId
                attributeFamilyId
                createdAt
                updatedAt
            }
        }
    }
}
`;
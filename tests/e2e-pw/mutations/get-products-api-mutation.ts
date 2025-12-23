export const getProductsMutation = `
    query getProducts($input: FilterProductsInput!) {
        products(input: $input) {
            paginatorInfo {
            count
            currentPage
            lastPage
            total
        }
        data {
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
            variants {
                id
                type
                attributeFamilyId
                sku
                parentId
            }
            parent {
                id
                type
                attributeFamilyId
                sku
                parentId
            }
            attributeFamily {
                id
                code
                name
                status
                isUserDefined
            }
            attributeValues {
                id
                locale
                channel
                textValue
                booleanValue
                integerValue
                floatValue
                dateTimeValue
                dateValue
                jsonValue
                productId
                attributeId
                attribute {
                    id
                    code
                    adminName
                    type
                }
            }
            superAttributes {
                id
                code
                adminName
                type
                position
            }
            categories {
                id
                position
                logoPath
                logoUrl
                status
                displayMode
                lft
                rgt
                parentId
                additional
                bannerPath
                bannerUrl
                name
                slug
                urlPath
                description
                metaTitle
                metaDescription
                metaKeywords
                localeId
                createdAt
                updatedAt
                filterableAttributes {
                    id
                    code
                    adminName
                    type
                    position
                }
            }
            inventories {
                id
                qty
                productId
                inventorySourceId
                vendorId
                inventorySource {
                    id
                    code
                    name
                    description
                    contactName
                    contactEmail
                    contactNumber
                    contactFax
                    country
                    state
                    city
                    street
                    postcode
                    priority
                    latitude
                    longitude
                    status
                }
            }
            cacheBaseImage {
                smallImageUrl
                mediumImageUrl
                largeImageUrl
                originalImageUrl
            }
            cacheGalleryImages {
                smallImageUrl
                mediumImageUrl
                largeImageUrl
                originalImageUrl
            }
            images {
                id
                type
                path
                productId
            }
            orderedInventories {
                id
                qty
                productId
                channelId
            }
            reviews {
                id
                name
                title
                rating
                comment
                status
                productId
                customerId
                createdAt
                updatedAt
                images {
                    id
                    reviewId
                    type
                    mimeType
                    path
                    url
                }
            }
            groupedProducts {
                id
                qty
                sortOrder
                productId
                associatedProductId
                associatedProduct {
                    id
                    type
                    attributeFamilyId
                    sku
                    parentId
                }
            }
            downloadableSamples {
                id
                url
                file
                fileName
                fileUrl
                type
                sortOrder
                productId
                createdAt
                updatedAt
                translations {
                    id
                    locale
                    title
                    productDownloadableSampleId
                }
            }
            downloadableLinks {
                id
                title
                price
                url
                file
                fileName
                fileUrl
                type
                sampleUrl
                sampleFile
                sampleFileName
                sampleType
                sortOrder
                productId
                downloads
                translations {
                    id
                    locale
                    title
                    productDownloadableLinkId
                }
            }
            bundleOptions {
                id
                type
                isRequired
                sortOrder
                productId
                bundleOptionProducts {
                    id
                    qty
                    isUserDefined
                    sortOrder
                    isDefault
                    productBundleOptionId
                    productId
                }
                translations {
                    id
                    locale
                    label
                    productBundleOptionId
                }
            }
            customerGroupPrices {
                id
                qty
                valueType
                value
                productId
                customerGroupId
                createdAt
                updatedAt
            }
            relatedProducts {
                id
            }
            upSells {
                id
            }
            crossSells {
                id
            }
            booking {
                id
                type
                qty
                location
                showLocation
                availableEveryWeek
                availableFrom
                availableTo
                productId
                product {
                    id
                }
            }
        }
    }
}
`;  

export const getParticularProductMutation = `
    query getProduct($id: ID!) {
        product(id: $id) {
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
            variants {
                id
                type
                attributeFamilyId
                sku
                parentId
            }
            parent {
                id
                type
                attributeFamilyId
                sku
                parentId
            }
            attributeFamily {
                id
                code
                name
                status
                isUserDefined
            }
            attributeValues {
                id
                locale
                channel
                textValue
                booleanValue
                integerValue
                floatValue
                dateTimeValue
                dateValue
                jsonValue
                productId
                attributeId
                attribute {
                    id
                    code
                    adminName
                    type
                }
            }
            superAttributes {
                id
                code
                adminName
                type
                position
            }
            categories {
                id
                position
                logoPath
                logoUrl
                status
                displayMode
                lft
                rgt
                parentId
                additional
                bannerPath
                bannerUrl
                name
                slug
                urlPath
                description
                metaTitle
                metaDescription
                metaKeywords
                localeId
                createdAt
                updatedAt
                filterableAttributes {
                    id
                    code
                    adminName
                    type
                    position
                }
            }
            inventories {
                id
                qty
                productId
                inventorySourceId
                vendorId
                inventorySource {
                    id
                    code
                    name
                    description
                    contactName
                    contactEmail
                    contactNumber
                    contactFax
                    country
                    state
                    city
                    street
                    postcode
                    priority
                    latitude
                    longitude
                    status
                }
            }
            cacheBaseImage {
                smallImageUrl
                mediumImageUrl
                largeImageUrl
                originalImageUrl
            }
            cacheGalleryImages {
                smallImageUrl
                mediumImageUrl
                largeImageUrl
                originalImageUrl
            }
            images {
                id
                type
                path
                productId
            }
            orderedInventories {
                id
                qty
                productId
                channelId
            }
            reviews {
                id
                name
                title
                rating
                comment
                status
                productId
                customerId
                createdAt
                updatedAt
                images {
                    id
                    reviewId
                    type
                    mimeType
                    path
                    url
                }
            }
            groupedProducts {
                id
                qty
                sortOrder
                productId
                associatedProductId
                associatedProduct {
                    id
                    type
                    attributeFamilyId
                    sku
                    parentId
                }
            }
            downloadableSamples {
                id
                url
                file
                fileName
                fileUrl
                type
                sortOrder
                productId
                createdAt
                updatedAt
                translations {
                    id
                    locale
                    title
                    productDownloadableSampleId
                }
            }
            downloadableLinks {
                id
                title
                price
                url
                file
                fileName
                fileUrl
                type
                sampleUrl
                sampleFile
                sampleFileName
                sampleType
                sortOrder
                productId
                downloads
                translations {
                    id
                    locale
                    title
                    productDownloadableLinkId
                }
            }
            bundleOptions {
                id
                type
                isRequired
                sortOrder
                productId
                bundleOptionProducts {
                    id
                    qty
                    isUserDefined
                    sortOrder
                    isDefault
                    productBundleOptionId
                    productId
                }
                translations {
                    id
                    locale
                    label
                    productBundleOptionId
                }
            }
            customerGroupPrices {
                id
                qty
                valueType
                value
                productId
                customerGroupId
                createdAt
                updatedAt
            }
            relatedProducts {
                id
            }
            upSells {
                id
            }
            crossSells {
                id
            }
        
    }
}`;
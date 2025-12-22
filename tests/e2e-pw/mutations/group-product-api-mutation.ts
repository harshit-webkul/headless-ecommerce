export const createGroupProductMutation = `
mutation createGroupProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    success
    message
    product {
      id
      sku
      type
      parentId
      attributeFamilyId
      createdAt
      updatedAt
    }
  }
}`;

export const updateGroupProductMutation = `
mutation updateGroupProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
        success
        message
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
    }
}`
;
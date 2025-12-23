export const deleteParticularProductMutation = `
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            success
            message
    }
}`;
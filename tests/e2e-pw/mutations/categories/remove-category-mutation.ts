export const deleteParticularCategoryMutation = `
    mutation deleteCategory($id: ID!) {
        deleteCategory(id: $id) {
            success
            message
    }
}`;
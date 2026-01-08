import { expect, test } from "@playwright/test";
import { updateCategoryMutation } from "../../../../mutations//categories/update-category-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update category via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCategoryResponse = fs.readFileSync(
            "create-category-createResponse.json",
            "utf-8"
        );

    const cre = JSON.parse(createCategoryResponse)
    console.log("Create Category Response Data:", cre);
    const category_id = Number(cre.createCategory.category.id);
    console.log("Category ID to update:", category_id);

    test('update category via graphQL api', async () => {
        const randomSuffix = Date.now();

        const updateCategoryCredentials = {
            name: `update-test${randomSuffix}`,
            locale: "all",
            slug: `update-${randomSuffix}`,
            description: `update-${randomSuffix}`,
            status: true,
            position: 3,
            displayMode: "products_and_description",
            parentId: 1,
            metaTitle: `update-${randomSuffix}`,
            metaDescription: `update-${randomSuffix}`,
            metaKeywords: `update-${randomSuffix}`,
            logoPath:[
                 "https://cdn.pixabay.com/photo/2018/04/05/14/09/sunflowers-3292932_960_720.jpg",
            ],
            bannerPath:["https://cdn.pixabay.com/photo/2017/05/23/10/53/t-shirt-design-2336850_960_720.jpg"] ,
            attributes: [
                "11","23","24","25",
            ],
        };

        /**
         * Execute create product mutation
         */
        const updateCategoryResponse = await apiClient.execute(updateCategoryMutation, {
                id : category_id,
                input: updateCategoryCredentials,
        }, { withAuth: true });

        console.log('Update Category Response:', updateCategoryResponse);

        const filePath = path.resolve(process.cwd(), "update-category-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(updateCategoryResponse, null, 2), "utf-8");

        expect(updateCategoryResponse.updateCategory.success).toBe( true );
        expect(updateCategoryResponse.updateCategory.message).toContain('Category updated successfully.');
        expect(updateCategoryResponse.updateCategory.category).toHaveProperty('id');
        expect(updateCategoryResponse.updateCategory.category.name).not.toEqual(cre.name);
        expect(updateCategoryResponse.updateCategory.category.slug).not.toEqual(cre.slug);
        expect(updateCategoryResponse.updateCategory.category.description).not.toEqual(cre.description);
        // expect(updateCategoryResponse.updateCategory.category.position).toEqual(updateCategoryCredentials.position);
        // expect(updateCategoryResponse.updateCategory.category.displayMode).toEqual(updateCategoryCredentials.displayMode);
        // expect(updateCategoryResponse.updateCategory.category.parentId).toEqual(updateCategoryCredentials.parentId.toString());
        // expect(updateCategoryResponse.updateCategory.category.metaTitle).toEqual(updateCategoryCredentials.metaTitle);
        // expect(updateCategoryResponse.updateCategory.category.metaDescription).toEqual(updateCategoryCredentials.metaDescription);
        // expect(updateCategoryResponse.updateCategory.category.metaKeywords).toEqual(updateCategoryCredentials.metaKeywords);
        const updateCategoryId = updateCategoryResponse.updateCategory.category.id;

        console.log('Updated Category ID:', updateCategoryId);
        /**
         * Verify database entry
         */
        // const productInDB = await DBClient.getRow(
        //     'SELECT * FROM categories WHERE id = ?',
        //     [createdCategoryId]
        // );

        // console.log('Product in DB:', productInDB);

        // expect(productInDB).not.toBeNull();
        // expect(productInDB?.display_mode).toEqual(updateCategoryCredentials.displayMode);

      });
});

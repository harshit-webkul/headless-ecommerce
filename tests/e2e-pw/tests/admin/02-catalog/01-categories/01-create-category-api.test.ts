import { expect, test } from "@playwright/test";
import { createCategoryMutation } from "../../../../mutations//categories/create-category-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Create category via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test('create category via graphQL api', async () => {
        const randomSuffix = Date.now();

        const createCategoryCredentials = {
            name: `test${randomSuffix}`,
            locale: "all",
            slug: `test-${randomSuffix}`,
            description: `test-${randomSuffix}`,
            status: true,
            position: 3,
            displayMode: "products_and_description",
            parentId: 1,
            metaTitle: `test-${randomSuffix}`,
            metaDescription: `test-${randomSuffix}`,
            metaKeywords: `test-${randomSuffix}`,
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
        const createResponse = await apiClient.execute(createCategoryMutation, {
                input: createCategoryCredentials
        }, { withAuth: true });

        console.log('Create Category Response:', createResponse);

        // const filePath = path.resolve(process.cwd(), "create-category-createResponse.json");

        // fs.writeFileSync(filePath, JSON.stringify(createResponse, null, 2), "utf-8");

         const filePath = path.resolve(
            process.cwd(),
            "create-category-createResponse.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(createResponse, null, 2),
            "utf-8"
        );

        expect(createResponse.createCategory.success).toBe(true);
        expect(createResponse.createCategory.message).toContain('Category created successfully.');
        expect(createResponse.createCategory.category).toHaveProperty('id');
        expect(createResponse.createCategory.category.name).toEqual(createCategoryCredentials.name);
        expect(createResponse.createCategory.category.slug).toEqual(createCategoryCredentials.slug);
        expect(createResponse.createCategory.category.description).toEqual(createCategoryCredentials.description);
        expect(createResponse.createCategory.category.status).toEqual(createCategoryCredentials.status);
        expect(createResponse.createCategory.category.position).toEqual(createCategoryCredentials.position);
        expect(createResponse.createCategory.category.displayMode).toEqual(createCategoryCredentials.displayMode);
        expect(createResponse.createCategory.category.parentId).toEqual(createCategoryCredentials.parentId.toString());
        expect(createResponse.createCategory.category.metaTitle).toEqual(createCategoryCredentials.metaTitle);
        expect(createResponse.createCategory.category.metaDescription).toEqual(createCategoryCredentials.metaDescription);
        expect(createResponse.createCategory.category.metaKeywords).toEqual(createCategoryCredentials.metaKeywords);
        const createdCategoryId = createResponse.createCategory.category.id;

        console.log('Created Category ID:', createdCategoryId);
        /**
         * Verify database entry
         */
        const productInDB = await DBClient.getRow(
            'SELECT * FROM categories WHERE id = ?',
            [createdCategoryId]
        );

        console.log('Product in DB:', productInDB);

        expect(productInDB).not.toBeNull();
        expect(productInDB?.display_mode).toEqual(createCategoryCredentials.displayMode);

      });
});

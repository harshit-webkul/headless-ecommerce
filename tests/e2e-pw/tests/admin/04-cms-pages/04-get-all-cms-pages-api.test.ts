import { expect, test } from "@playwright/test";
import { getAllCMSpagesMutation } from "../../../mutations/cms-pages/get-all-cms-pages-api-mutation";
import { DBClient } from "../../../utils/dbClient";
import { GraphQLClient } from "../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("Get All cms pages via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);
    test("All cms pages via graphQL api", async () => {

        const getAllCMSpagesCredentials = {
            first: "10",
            page: "1",
        };

        /**
         * Execute get all customers mutation
         */
        const getAllCMSpagesResponse = await apiClient.execute(
            getAllCMSpagesMutation,
            {getAllCMSpagesCredentials},
            { withAuth: true }
        );

        console.log("get all customers Response:", getAllCMSpagesResponse);        

        const filePath = path.resolve(
            process.cwd(),
            "get-all-customers-createResponse.json"
        );
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(getAllCMSpagesResponse, null, 2),
            "utf-8"
        );

        expect(getAllCMSpagesResponse.cmsPages.data.length).toBeGreaterThan(
            0
        );

        /**
         * get the total data from cms pages table
         */
        const cmsPagesCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM cms_pages'
        );

        const total_cms_pages =  cmsPagesCount.total;
        console.log(total_cms_pages);
        expect(getAllCMSpagesResponse.cmsPages.paginatorInfo.total).toEqual(total_cms_pages);
    });
});

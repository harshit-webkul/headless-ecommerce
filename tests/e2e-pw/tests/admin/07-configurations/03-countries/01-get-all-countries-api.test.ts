import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { getAllCountriesQuery as GET_ALL_COUNTRIES } from "../../../../mutations/core-configuration/countries-mutation";
import * as fs from "fs";
import path from "path";

test.describe("Countries - List API", () => {
    test("retrieves all countries and contains United States (US)", async () => {
        const client = new GraphQLClient();
        const res = await client.execute(GET_ALL_COUNTRIES, {}, { withAuth: true });

        expect(res.countries).toBeTruthy();
        expect(Array.isArray(res.countries)).toBe(true);

        console.log("get all countries:" ,  res);

        const found = res.countries.find((c: any) => c.code === "US");
        expect(found).toBeTruthy();
        expect(found.name).toBe("United States");

        console.log(found);

        const filePath = path.resolve(
            process.cwd(),
            "get-US-country-Response.json"
        );

        fs.writeFileSync(
            filePath,
            JSON.stringify(found, null, 2),
            "utf-8"
        );
    });
});

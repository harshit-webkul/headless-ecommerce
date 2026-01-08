import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { getParticularCountry as GET_PARTICULAR_COUNTRY } from "../../../../mutations/core-configuration/countries-mutation";
import * as fs from "fs";

test.describe("Countries - Get API", () => {
    test("retrieves a particular country id", async () => {
        const client = new GraphQLClient();
        const usCountryResponse = fs.readFileSync(
            "get-US-country-Response.json",
            "utf-8"
        );

        const cre = JSON.parse(usCountryResponse);
        console.log("US-country Response Data:", cre);
        const country_id = Number(cre.id);
        console.log("create-locale ID to update:", country_id);

        const res = await client.execute(GET_PARTICULAR_COUNTRY, { id: country_id }, { withAuth: true });

        expect(res.country).toBeTruthy();
        expect(Number(res.country.id)).toBe(country_id);
        expect(res.country.code).toBe("US");
        expect(res.country.name).toBe("United States");
        expect(Array.isArray(res.country.states)).toBe(true);
        // at least one state should belong to the country
        expect(res.country.states.length).toBeGreaterThan(0);
    });
});

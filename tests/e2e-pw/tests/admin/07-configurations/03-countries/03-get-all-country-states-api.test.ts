import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { getAllCountryStatesQuery as GET_COUNTRY_STATES } from "../../../../mutations/core-configuration/countries-mutation";

test.describe("Country States - List API", () => {
    test("retrieves states for United States (countryCode: US)", async () => {
        const client = new GraphQLClient();

        const input = { countryCode: "US" };
        const res = await client.execute(GET_COUNTRY_STATES, { input: {} }, { withAuth: true });

        expect(res.countrieStates).toBeTruthy();
        expect(Array.isArray(res.countrieStates)).toBe(true);

        const found = res.countrieStates.find((s: any) => s.code === "CA" || s.defaultName === "California");
        expect(found).toBeTruthy();
    });
});

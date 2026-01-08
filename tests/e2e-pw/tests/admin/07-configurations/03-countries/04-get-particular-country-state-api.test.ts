import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { getParticularCountryStateQuery as GET_PARTICULAR_STATE } from "../../../../mutations/core-configuration/countries-mutation";
import * as fs from "fs";


test.describe("Country State - Get API", () => {
    test("retrieves particular state by id (California -> id: 12)", async () => {

        const usCountryStateResponse = fs.readFileSync(
            "get-US-country-Response.json",
            "utf-8"
        );

        const cre = JSON.parse(usCountryStateResponse);
        console.log("US-country Response Data:", cre);
        const country_state_id = Number(cre.states[0].id);
        console.log("create-locale ID to update:", country_state_id);
        const client = new GraphQLClient();

        const res = await client.execute(GET_PARTICULAR_STATE, { id: country_state_id}, { withAuth: true });

        console.log("country states:", res);

        expect(res.countrieState).toBeTruthy();
        expect(Number(res.countrieState.id)).toBe(country_state_id);
        expect(res.countrieState.countryCode).toBe(cre.states[0].countryCode);
        expect(res.countrieState.defaultName).toBe(cre.states[0].defaultName);
    });
});

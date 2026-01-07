import { test, expect } from "@playwright/test";
import { getAllExchangeRatesQuery } from "../../../../mutations/settings/exchange-rate-mutation";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";

test.describe("Get All Exchange Rates", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);

    test("get all exchange rates", async () => {

        const response = await apiClient.execute(
            getAllExchangeRatesQuery,
            {
                first: 10,
                page: 1,
                input: {}
            },
            { withAuth: true }
        );

        console.log("Get All Exchange Rates Response:", response);

        expect(response.exchangeRates.data.length).toBeGreaterThan(0);
        expect(response.exchangeRates.paginatorInfo.total).toBeGreaterThan(0);

        /**
         * get the total data from customers table
         */
        const exchangeRateCount = await DBClient.getRow(
        'SELECT COUNT(*) AS total FROM currency_exchange_rates'
        );

        const total_exchange_rates =  exchangeRateCount.total;
        console.log(total_exchange_rates);
        expect(response.exchangeRates.paginatorInfo.total).toEqual(total_exchange_rates);
    });
});

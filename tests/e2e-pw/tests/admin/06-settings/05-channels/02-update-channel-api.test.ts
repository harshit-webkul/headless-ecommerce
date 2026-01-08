import { test, expect } from "@playwright/test";
import { updateChannelMutation } from "../../../../mutations/settings/channels-mutation";
import { createInventorySourceMutation } from "../../../../mutations/settings/inventories-mutation";
import { createLocaleMutation } from "../../../../mutations/settings/locales-mutation";
import {createCurrencyMutation} from "../../../../mutations/settings/currencies-mutation"
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("update Channel", () => {

    const apiClient = new GraphQLClient(GraphQLClient.baseURL);
    const randomSuffix = Date.now();
    const randomCode = Array.from({ length: 3 }, () =>
          String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");      

    console.log(randomCode);

    test.beforeEach('before update the channel', async () => {

        /**
         * Create inventory Source
         */
        const createInventoryInput = {
            code: `SRC${randomSuffix}`,
            name: `Warehouse ${randomSuffix}`,
            description: `"Primary warehouse"${randomSuffix}`,
            contactName: "Admin",
            contactEmail: `admin${randomSuffix}@example.com`,
            contactNumber: `${randomSuffix}`,
            // contactFax: randomSuffix,
            country: "IN",
            state: "KA",
            city: `city"${randomSuffix}`,
            street: "MG Road",
            postcode: `${randomSuffix}`,
            priority: 1,
            // latitude: "12.9716",
            // longitude: "77.5946",
            status: true
        };

        const createInventorySourceResponse = await apiClient.execute(
            createInventorySourceMutation,
            { input: createInventoryInput },
            { withAuth: true }
        );

        console.log("Create Inventory Source Response:", createInventorySourceResponse);

        fs.writeFileSync(
            path.resolve(process.cwd(), "create-inventory-source-response.json"),
            JSON.stringify(createInventorySourceResponse, null, 2),
            "utf-8"
        );

        /**
         * Create Locale
         */
        
        const createLocaleCredentials = {
            code: `loc_${randomSuffix}`,
            name: `Test Locale ${randomSuffix}`,
            direction: "LTR",
            image: "https://via.placeholder.com/300/09f/fff.png"
        };

        /**
         * Execute create Locale
         */
        const createLocaleResponse = await apiClient.execute(
            createLocaleMutation,
            {
                input: createLocaleCredentials,
            },
            { withAuth: true }
        );

        console.log("Create Locale Response:", createLocaleResponse);

        const filePath1 = path.resolve(
            process.cwd(),
            "create-locale-createResponse.json"
        );

        fs.writeFileSync(
            filePath1,
            JSON.stringify(createLocaleResponse, null, 2),
            "utf-8"
        );

        /**
         * Create Currency
         */

        const createCurrencyInput = {
            code: `${randomCode}`,
            name: `currencies_${randomSuffix}`,
            symbol: "",
            decimal: 2,
            groupSeparator: ",",
            decimalSeparator: ".",
            currencyPosition: "LEFT",
        };
        console.log(createCurrencyInput.code)

        const response = await apiClient.execute(
            createCurrencyMutation,
            { input: createCurrencyInput },
            { withAuth: true }
        );

        console.log("Create Currency Response:", response);

        const filePath = path.resolve(
            process.cwd(),
            "create-currency-createResponse.json"
        );

        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");
        

    });

    test("update channel", async () => {
        const createInventoryResponse = JSON.parse(
            fs.readFileSync("create-inventory-source-response.json", "utf-8")
        );
    
        const inventorySourceId = Number(
            createInventoryResponse.createInventorySource.inventorySource.id
        );
        console.log("inventorySourceId", inventorySourceId);

        const createLocalesResponse = fs.readFileSync(
            "create-locale-createResponse.json",
            "utf-8"
        );
        const cre = JSON.parse(createLocalesResponse);
        const locale_id = Number(cre.createLocale.locale.id);
        console.log("create-locale ID to update:", locale_id);

        const createResponse = JSON.parse(
                fs.readFileSync("create-currency-createResponse.json", "utf-8")
            );
        const currencyId = Number(createResponse?.createCurrency?.currency?.id);
        console.log("currencyId", currencyId);

        const createChannelResponse = JSON.parse(
            fs.readFileSync("create-channel-response.json", "utf-8")
        );
        const channelId = Number(createChannelResponse.createChannel.channel.id);
        console.log(channelId);

        const createInput = {
            code: `fashion_${randomSuffix}`,
            name: `"Today's Fashion"${randomSuffix}`,
            description: `E-Comm clothing house-${randomSuffix}`,
            inventorySources: [`${inventorySourceId}`],
            rootCategoryId: 1,
            hostname: `http://192.168.15.204/fashion-${randomSuffix}`,
            locales: [`${locale_id}`],
            defaultLocaleId: locale_id,
            currencies: [`${currencyId}`],
            baseCurrencyId: currencyId,
            theme: "default",
            logo: "http://graphqlnew.com/storage/channel/1/gdNLcKZrc3PbGXMThHygPFBijLXa1z0sEaBi7LFj.jpg",
            favicon: "http://graphqlnew.com/storage/channel/1/YZBH5Ow7whEivfmMHLTjqaObTgb5behn01fsaYzB.jpg",
            seoTitle: "sdfsdf",
            seoDescription: "sdfsdfsdf",
            seoKeywords: "sfsdfdsx",
            maintenanceModeText: "ertwretwrt",
            allowedIps: "",
            isMaintenanceOn: true,
        };

        const response = await apiClient.execute(
            updateChannelMutation,
            {
                id :  channelId,
                input: createInput ,
            },
            { withAuth: true }
        );

        console.log("update Channel Response:", response);

        fs.writeFileSync(
            path.resolve(process.cwd(), "update-channel-response.json"),
            JSON.stringify(response, null, 2),
            "utf-8"
        );

        expect(response.updateChannel.success).toBe(true);
        expect(response.updateChannel.channel.code).not.toEqual(createInput.code);
    });
});

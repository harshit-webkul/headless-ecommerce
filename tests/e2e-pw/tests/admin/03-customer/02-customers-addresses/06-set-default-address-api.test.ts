import { expect, test } from "@playwright/test";
import { setDefaultAddressMutation } from "../../../../mutations/customer-addresses/set-default-address-api-mutation";
import {CreateCustomerAddressMutation} from "../../../../mutations/customer-addresses/create-customer-address-api-mutation";
import {getAllAddessesMutation} from "../../../../mutations/customer-addresses/get-all-addresses-api-mutation";
import { DBClient } from "../../../../utils/dbClient";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import * as fs from "fs";
import path from "path";

test.describe("set customer default address details via GraphQL API", () => {
    let apiClient: GraphQLClient;
    apiClient = new GraphQLClient(GraphQLClient.baseURL);

    const createCustomerResponse = fs.readFileSync(
            "create-customer-createResponse.json",
            "utf-8"
        );

    const customer_response = JSON.parse(createCustomerResponse);
    const customer_id = Number(customer_response.createCustomer.customer.id);
    console.log('customer_id: ', customer_id);

    test('set default address details via graphQL api', async () => {
        const randomSuffix = Date.now();

        /**
         * Execute Create customer Address
         */
        const customerAddressCredential = {
            customerId: customer_id,
            companyName: `Stark Industries${randomSuffix}`,
            firstName: `john${randomSuffix}`,
            lastName: `Doe${randomSuffix}`,
            address: `3180 Bluff Street${randomSuffix}`,
            city: "GLEN CAMPBELL",
            postcode: `${randomSuffix}`,
            country: "US",
            state: "PA",
            phone: `${randomSuffix}`,
            email: `johndoe${randomSuffix}@example.com`,
            defaultAddress: false,
        };
        const createCustomerAddressResponse = await apiClient.execute(
            CreateCustomerAddressMutation,
            {
                input: customerAddressCredential,
            },
            { withAuth: true }
        );
        console.log(createCustomerAddressResponse);
        expect(
            createCustomerAddressResponse.createCustomerAddress.success
        ).toBe(true);
        expect(
            createCustomerAddressResponse.createCustomerAddress.message
        ).toContain("Customer's address created successfully.");
        const filePathCustomer = path.resolve(
            process.cwd(),
            "create-customer-address-createResponse.json"
        );
        fs.writeFileSync(
            filePathCustomer,
            JSON.stringify(createCustomerAddressResponse, null, 2),
            "utf-8"
        );

        const address_id = Number(createCustomerAddressResponse.createCustomerAddress.address.id);
        
        /**
         * Execute Set customer address By-default
         */
        const setCustomerDefaultAddressResponse = await apiClient.execute(setDefaultAddressMutation, {
                id : address_id,
                customerId : customer_id,
        }, { withAuth: true });

        console.log('Update customer address Response:', setCustomerDefaultAddressResponse);

        const filePath = path.resolve(process.cwd(), "set-customer-default-address-updateResponse.json");

        fs.writeFileSync(filePath, JSON.stringify(setCustomerDefaultAddressResponse, null, 2), "utf-8");

        expect(setCustomerDefaultAddressResponse.setAsDefaultAddress.success).toBe(true);


        // expect(setCustomerDefaultAddressResponse.updateCustomerAddress.message).toContain("Customer's address updated successfully.");
        // expect(setCustomerDefaultAddressResponse.updateCustomerAddress.address.email).not.toEqual(cre.createCustomerAddress.address.email);
        

        const getParticularCustomerAddress = {
                    // id: 1,
                    customerId: customer_id,
                    // companyName: "Test",
                    // firstName: "Jhon",
                    // lastName: "Doe",
                    // address1: "h-28 arv park",
                    // country: "IN",
                    // state: "UP",
                    // city: "AGRA",
                    // postcode: "201301",
                    // phone: "9876543210",
                    // vatId: "989898",
                    // defaultAddress: true,
                };
                const getAllAddressesCredentials = {
                    first: "10",
                    page: "1",
                };
        
                /**
                 * Execute get all customers mutation
                 */
                const getCustomerAllAddressesResponse = await apiClient.execute(
                    getAllAddessesMutation,
                    {
                        getAllAddressesCredentials,
                        input: {
                            customerId: customer_id,
                        },
                    },
                    { withAuth: true }
                );
        
                console.log(
                    "customer all addresses Response:",
                    getCustomerAllAddressesResponse
                );
        
                console.log(
                  "FULL RESPONSE:",
                  JSON.stringify(getCustomerAllAddressesResponse, null, 2)
                );
        
                // expect(
                //     getCustomerAllAddressesResponse.customerAddresses.data.length
                // ).toBeGreaterThan(0);
        
                console.log(
                    "address data length: ",
                    getCustomerAllAddressesResponse.customerAddresses.data.length
                );
        
                const addresses =
                  getCustomerAllAddressesResponse?.customerAddresses?.data;
        
                expect(Array.isArray(addresses)).toBe(true);
                expect(addresses.length).toBeGreaterThan(0);
        
                // Filter default addresses
                const defaultAddresses = addresses.filter(
                  (address: any) => address.defaultAddress === true
                );
        
                console.log(
                  "Default addresses found:",
                  defaultAddresses.map((a: any) => a.id)
                );
        
                // Assert ONLY ONE default address
                expect(defaultAddresses.length).toBe(1);
    });
});

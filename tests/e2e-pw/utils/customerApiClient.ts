import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // <-- ESM fix
import { APIRequestContext, request, expect } from "@playwright/test";
import { customerSignInMutation } from "../mutations/shop-mutation/session-mutation/session-mutation";
import { DBClient } from "./dbClient";

/**
 * Fix __dirname for ES modules
 */ 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Now TOKEN_FILE will work
 */ 

const TOKEN_FILE = path.resolve(__dirname, "../.state/customer-token.json");

function saveCustomerToken(token: string) {
    fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({ token }), "utf-8");
}

function loadCustomerToken(): string | null {
    if (fs.existsSync(TOKEN_FILE)) {
        const data = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
        return data.token || null;
    }
    return null;
}

export class GraphQLCustomerClient {
    static baseURL = `${process.env.APP_URL}`.replace(/\/+$/, "") + "/graphql";

    private baseUrl: string;
    private customerToken: string | null = null;
    private context: APIRequestContext | null = null;

    constructor(baseUrl: string = GraphQLCustomerClient.baseURL) {
        this.baseUrl = baseUrl;
        this.customerToken = loadCustomerToken(); // load persisted token
        console.log(`GraphQLClient initialized with baseUrl: ${this.baseUrl}`);
    }

    async init() {
        if (!this.context) {
            this.context = await request.newContext({
                extraHTTPHeaders: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        }
    }

    private authCustomerHeader(extraHeaders: Record<string, string> = {}) {
        if (!this.customerToken) {
            throw new Error("customerToken is not set. Please login first.");
        }
        return {
            Authorization: `Bearer ${this.customerToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            ...extraHeaders,
        };
    }

    async customerLogin(email: string, password: string, remember = true, deviceToken: string, deviceName: string) {
        if (this.customerToken) return; // Already logged in

        await this.init();

        const response = await this.context!.post(this.baseUrl, {
            data: {
                query: customerSignInMutation,
                variables: {
                    input: { email, password, remember, deviceToken, deviceName },
                },
            },
        });

        const body = await response.json();

        console.log("Login Response Body:", body);
        console.log("Login Response Body:", body.data);

        expect(response.status()).toBe(200);
        expect(body.data.customerLogin.success).toBe(true);
        expect(body.data.customerLogin.customer.email).toBe(email);

        expect(body).toHaveProperty(
            "data.customerLogin.message",
            "Success: Customer login successful."
        );

        expect(body.data.customerLogin.success).toBe(true);

        if (body.errors?.length) {
            throw new Error(
                `Login failed:\n${JSON.stringify(body.errors, null, 2)}`
            );
        }

        this.customerToken = body.data?.customerLogin?.accessToken;
        console.log(this.customerToken);

        if (!this.customerToken) {
            throw new Error(
                `No accessToken found in response:\n${JSON.stringify(
                    body,
                    null,
                    2
                )}`
            );
        }

        // Persist token for reuse across scripts
        saveCustomerToken(this.customerToken);

        // Optional: DB validation
        const dbUser = await DBClient.getRow(
            "SELECT email FROM customers WHERE email = ?",
            [email]
        );
        if (!dbUser || dbUser.email !== email) {
            throw new Error(`DB validation failed for email: ${email}`);
        }
    }

    getCustomerToken() {
        return this.customerToken;
    }

    setCustomerToken(token: string) {
        this.customerToken = token;
        saveCustomerToken(token);
    }

    async customerExecute<T = any>(
        query: string,
        variables: Record<string, any> = {},
        options?: {
            withAuth?: boolean;
            appSecretKey?: string;
        }
    ): Promise<T> {
        await this.init();

        const headers: Record<string, string> = {};

        console.log('this.customerToken: ', this.customerToken);
        if (options?.withAuth !== false && this.customerToken) {
            Object.assign(headers, this.authCustomerHeader());
        }

        if (options?.appSecretKey) {
            headers["x-app-secret-key"] = options.appSecretKey;
        }

        const response = await this.context!.post(this.baseUrl, {
            data: { query, variables },
            headers,
        });

        const body = await response.json();
        console.log("GraphQL Response Body:", body);

        return body.data as T;
    }

    async dispose() {
        await this.context?.dispose();
    }

    clearCustomerToken() {
        this.customerToken = null;
        if (fs.existsSync(TOKEN_FILE)) {
            fs.unlinkSync(TOKEN_FILE);
        }
    }

    loadSavedCustomerToken() {
        return loadCustomerToken();
    }
}

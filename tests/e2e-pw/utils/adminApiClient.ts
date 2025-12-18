// utils/graphqlClient.ts
import { APIRequestContext, expect, request } from "@playwright/test";
import { loginMutation } from "../mutations/session-mutation";

export class GraphQLClient {
    static baseURL = `${process.env.APP_URL}`.replace(/\/+$/, "") + "/graphql";

    private baseUrl: string;
    private adminToken: string | null = null;
    private context: APIRequestContext | null = null;

    constructor(baseUrl: string = GraphQLClient.baseURL) {
        this.baseUrl = baseUrl;
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

    /**
     * Authorization header
     */
    private authHeader() {
        if (!this.adminToken) {
            throw new Error("adminToken is not set. Please login first.");
        }

        return {
            Authorization: `Bearer ${this.adminToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }

    /**
     * USER / ADMIN LOGIN via GraphQL
     * (Rename later if needed: userLogin / adminLogin)
     */
    async adminLogin(email: string, password: string, remember = true) {
        await this.init();

        const response = await this.context!.post(this.baseUrl, {
            data: {
                query: loginMutation,
                variables: {
                    input: {
                        email,
                        password,
                        remember,
                    },
                },
            },
        });

        const body = await response.json();
        console.log('Login Response Body:', body);
        console.log('Login Response Body:', body.data?.userLogin?.user);

        expect(response.status()).toBe(200);
        expect(body).toHaveProperty('data.userLogin.success', true);
        expect(body).toHaveProperty('data.userLogin.accessToken');
        expect(body).toHaveProperty('data.userLogin.user.email', email);
        expect(body).toHaveProperty('data.userLogin.user.role.name', 'Administrator');
        expect(body).toHaveProperty('data.userLogin.message', 'Success: User login successfully.');
        // GraphQL-level errors
        if (body.errors?.length) {
            throw new Error(
                `Login failed:\n${JSON.stringify(body.errors, null, 2)}`
            );
        }

        // ✅ Correct token path
        this.adminToken = body.data?.userLogin?.accessToken;

        if (!this.adminToken) {
            throw new Error(
                `No accessToken found in response:\n${JSON.stringify(body, null, 2)}`
            );
        }
    }

    getAdminToken() {
        return this.adminToken;
    }

    setAdminToken(token: string) {
        this.adminToken = token;
    }

    /**
     * Generic GraphQL executor
     */
    async execute<T = any>(
        query: string,
        variables: Record<string, any> = {},
        withAuth = true
    ): Promise<T> {
        await this.init();

        const response = await this.context!.post(this.baseUrl, {
            data: {
                query,
                variables,
            },
            headers: withAuth && this.adminToken ? this.authHeader() : {},
        });

        const body = await response.json();
        console.log('Login Response Body:', body);

        if (body.errors?.length) {
            throw new Error(
                `GraphQL Error:\n${JSON.stringify(body.errors, null, 2)}`
            );
        }

        return body.data as T;
    }

    async dispose() {
        await this.context?.dispose();
    }
}

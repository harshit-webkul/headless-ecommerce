import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // <-- ESM fix
import { APIRequestContext, request, expect } from "@playwright/test";
import { loginMutation } from "../mutations/session-mutation";
import { DBClient } from "./dbClient";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now TOKEN_FILE will work
const TOKEN_FILE = path.resolve(__dirname, "../.state/admin-token.json");

function saveToken(token: string) {
    fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({ token }), "utf-8");
}

function loadToken(): string | null {
    if (fs.existsSync(TOKEN_FILE)) {
        const data = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
        return data.token || null;
    }
    return null;
}

export class GraphQLClient {
    static baseURL = `${process.env.APP_URL}`.replace(/\/+$/, "") + "/graphql";

    private baseUrl: string;
    private adminToken: string | null = null;
    private context: APIRequestContext | null = null;

    constructor(baseUrl: string = GraphQLClient.baseURL) {
        this.baseUrl = baseUrl;
        this.adminToken = loadToken(); // load persisted token
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

    private authHeader(extraHeaders: Record<string, string> = {}) {
        if (!this.adminToken) {
            throw new Error("adminToken is not set. Please login first.");
        }
        return {
            Authorization: `Bearer ${this.adminToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            ...extraHeaders,
        };
    }

    async adminLogin(email: string, password: string, remember = true) {
        if (this.adminToken) return; // Already logged in

        await this.init();

        const response = await this.context!.post(this.baseUrl, {
            data: {
                query: loginMutation,
                variables: {
                    input: { email, password, remember },
                },
            },
        });

        const body = await response.json();

        console.log("Login Response Body:", body);
        console.log("Login Response Body:", body.data);

        expect(response.status()).toBe(200);
        expect(body).toHaveProperty("data.userLogin.success", true);
        expect(body).toHaveProperty("data.userLogin.accessToken");
        expect(body).toHaveProperty("data.userLogin.user.email", email);
        expect(body).toHaveProperty(
            "data.userLogin.user.role.name",
            "Administrator"
        );
        expect(body).toHaveProperty(
            "data.userLogin.message",
            "Success: User login successfully."
        );

        expect(body.data.userLogin.success).toBe(true);

        if (body.errors?.length) {
            throw new Error(
                `Login failed:\n${JSON.stringify(body.errors, null, 2)}`
            );
        }

        this.adminToken = body.data?.userLogin?.accessToken;

        if (!this.adminToken) {
            throw new Error(
                `No accessToken found in response:\n${JSON.stringify(
                    body,
                    null,
                    2
                )}`
            );
        }

        // Persist token for reuse across scripts
        saveToken(this.adminToken);

        // Optional: DB validation
        const dbUser = await DBClient.getRow(
            "SELECT email FROM admins WHERE email = ?",
            [email]
        );
        if (!dbUser || dbUser.email !== email) {
            throw new Error(`DB validation failed for email: ${email}`);
        }
    }

    getAdminToken() {
        return this.adminToken;
    }

    setAdminToken(token: string) {
        this.adminToken = token;
        saveToken(token);
    }

    async execute<T = any>(
        query: string,
        variables: Record<string, any> = {},
        options?: {
            withAuth?: boolean;
            appSecretKey?: string;
        }
    ): Promise<T> {
        await this.init();

        const headers: Record<string, string> = {};

        if (options?.withAuth !== false && this.adminToken) {
            Object.assign(headers, this.authHeader());
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

    clearToken() {
        this.adminToken = null;
        if (fs.existsSync(TOKEN_FILE)) {
            fs.unlinkSync(TOKEN_FILE);
        }
    }

    loadSavedToken() {
        return loadToken();
    }
}

import { test, expect } from "@playwright/test";
import { GraphQLClient } from "../../../../utils/adminApiClient";
import { DBClient } from "../../../../utils/dbClient";
import { UpdateCustomScriptMutation as UPDATE_CUSTOM_SCRIPT } from "../../../../mutations/core-configuration/custom-scripts-mutation";

test.describe("Custom Scripts - Update API", () => {
    test.beforeAll(async () => {
        const apiClient = new GraphQLClient();
        await apiClient.adminLogin("admin@example.com", "admin123", true);
    });

    test("updates custom CSS and JavaScript and restores previous values", async () => {
        const client = new GraphQLClient();

        // Read existing values to restore later
        const cssRow = await DBClient.getRow(`SELECT value FROM core_config WHERE code = ? LIMIT 1`, [
            "general.content.custom_scripts.custom_css",
        ]);
        const jsRow = await DBClient.getRow(`SELECT value FROM core_config WHERE code = ? LIMIT 1`, [
            "general.content.custom_scripts.custom_javascript",
        ]);

        const originalCss = cssRow ? cssRow.value : "";
        const originalJs = jsRow ? jsRow.value : "";

        const payload = {
            css: ".test-custom-css { color: red; }",
            javascript: "console.log('test-custom-js');",
        };

        try {
            const res = await client.execute(UPDATE_CUSTOM_SCRIPT, { input: payload }, {withAuth: true});

            expect(res.updateCustomScript).toBeTruthy();
            expect(res.updateCustomScript.success).toBeTruthy();

            const returned = res.updateCustomScript.customScripts;
            expect(returned).toBeTruthy();
            expect(returned.css).toBe(payload.css);
            expect(returned.javascript).toBe(payload.javascript);
            expect(res.updateCustomScript.message).toContain('Success: Custom scripts updated successfully.');

            // Verify DB values updated
            const updatedCssRow = await DBClient.getRow(`SELECT value FROM core_config WHERE code = ? LIMIT 1`, [
                "general.content.custom_scripts.custom_css",
            ]);
            const updatedJsRow = await DBClient.getRow(`SELECT value FROM core_config WHERE code = ? LIMIT 1`, [
                "general.content.custom_scripts.custom_javascript",
            ]);

            expect(updatedCssRow).not.toBeNull();
            expect(updatedJsRow).not.toBeNull();
            expect(updatedCssRow!.value).toBe(payload.css);
            expect(updatedJsRow!.value).toBe(payload.javascript);

        } finally {
            // Restore original values to avoid test pollution
            await client.execute(UPDATE_CUSTOM_SCRIPT, { input: { css: originalCss, javascript: originalJs } }, {withAuth: true});

            const restoredCssRow = await DBClient.getRow(`SELECT value FROM core_config WHERE code = ? LIMIT 1`, [
                "general.content.custom_scripts.custom_css",
            ]);
            const restoredJsRow = await DBClient.getRow(`SELECT value FROM core_config WHERE code = ? LIMIT 1`, [
                "general.content.custom_scripts.custom_javascript",
            ]);

            expect(restoredCssRow).not.toBeNull();
            expect(restoredJsRow).not.toBeNull();
            expect(restoredCssRow!.value).toBe(originalCss);
            expect(restoredJsRow!.value).toBe(originalJs);
        }
    });
});

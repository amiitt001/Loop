## 2024-05-22 - Broken Access Control in Admin Verification
**Vulnerability:** The `verifyAdmin` function verified the authenticity of the Firebase token but failed to check the `admin` custom claim, allowing any authenticated user to perform admin actions.
**Learning:** Authentication (who are you) != Authorization (what can you do). Verifying a token only proves identity, not privilege.
**Prevention:** Always check for specific claims (roles) after verifying the token signature. Separate the verification step from the authorization check.

## 2025-02-04 - Client-Side Secret Exposure Risk
**Vulnerability:** The backend supported a fallback to `VITE_` prefixed environment variables for sensitive secrets (private keys).
**Learning:** Developers sometimes prefix secrets with `VITE_` by mistake or misunderstanding, thinking it makes them available "globally", but `VITE_` specifically exposes them to the client bundle. Supporting this in the backend validates this dangerous pattern.
**Prevention:** Never allow fallbacks to `VITE_` variables for secrets in backend code. Explicitly warn or fail if such variables exist to alert the developer.

## 2025-02-05 - Insecure Direct Object Reference to Google Script
**Vulnerability:** The Google Apps Script URL was exposed in the client-side code (`VITE_GOOGLE_SHEET_URL`), allowing unauthenticated users to trigger arbitrary actions (including deletion) defined in the script.
**Learning:** External integrations often lack granular permissions (like "append-only"). Exposing their direct URLs to the client grants the client full permissions over that integration.
**Prevention:** Proxy all external integrations through the backend. This allows the backend to enforce authentication, validation, and rate limiting before forwarding the request to the external service.

## 2025-02-17 - Unbounded JSON Array Input
**Vulnerability:** The `responses` field in the registration API accepted arbitrary JSON input without type checking or length limits, allowing potential Denial of Service (DoS) via huge payloads or application crashes due to unexpected data types.
**Learning:** `JSON.parse` (implicit in body parsing) allows deeply nested or massive structures that simple top-level key validation misses. Developers often assume the shape of the data matches the frontend form.
**Prevention:** Explicitly validate the structure, type, and size of all complex objects (arrays/nested objects) in API inputs. Use schema validation or rigorous manual checks.

# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.  We actively monitor and address security vulnerabilities in supported versions.  Older versions are not actively monitored and may contain known vulnerabilities.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in our WeChat Mini Program, we appreciate your help in disclosing it to us in a responsible manner.  Please do not publicly disclose these details without our prior written consent.

**How to Report:**

1.  **Email:** Send an email to 424635328@qq.com (Replace `yourdomain.com` with your actual domain).  Please encrypt the email with our PGP public key (available at [Link to your PGP public key, if applicable]). If you don't have PGP, let us know, and we can arrange an alternate secure communication method.
2.  **Subject Line:**  Use the subject line: "WeChat Mini Program Security Vulnerability Report".

**What to Include in Your Report:**

*   **Detailed Description:**  Provide a clear and concise description of the vulnerability, including the potential impact.
*   **Steps to Reproduce:**  Include detailed steps that we can follow to reproduce the vulnerability.  The more detailed, the better.  Include specific API endpoints, parameters, and user interactions.
*   **Affected Versions:**  Specify the version(s) of the Mini Program that are affected.
*   **Potential Impact:**  Describe the potential consequences of the vulnerability, such as data leakage, unauthorized access, or denial of service.
*   **Proof of Concept (Optional):**  If possible, include a proof-of-concept (POC) exploit demonstrating the vulnerability.  This is not required, but highly appreciated.
*   **Your Contact Information:** Provide your name and email address so we can contact you for further information.

**Our Response Process:**

1.  **Acknowledgement:**  We will acknowledge receipt of your report within **[Number] business days** (e.g., 2 business days).
2.  **Investigation:**  Our security team will investigate the reported vulnerability.  This process may take **[Number] business days** (e.g., 5-10 business days), depending on the complexity of the issue.
3.  **Status Updates:**  We will provide you with regular updates on the progress of our investigation.  You can expect an update at least every **[Number] business days** (e.g., 5 business days).
4.  **Resolution:**  If the vulnerability is confirmed, we will work to develop and deploy a fix as quickly as possible. We will notify you when the fix is available.
5.  **Disclosure:**  We will publicly disclose the vulnerability (with your permission) after a fix has been released.  We will give you credit for the discovery, unless you request anonymity.
6. **Bug Bounty (Optional):**  [Describe your bug bounty program here, if you have one.  Include details about eligibility, rewards, and payout terms.  For example: "We offer a bug bounty for qualifying vulnerability reports.  The amount of the reward will depend on the severity of the vulnerability and the quality of the report.  See our Bug Bounty Program page for details: [Link to your Bug Bounty Program Page]"]. If you don't have a bug bounty program, you can omit this section.

**What to Expect:**

*   **Acceptance:** If we confirm the vulnerability, we will work diligently to address it and keep you informed throughout the process.
*   **Rejection:**  If we determine that the reported issue is not a security vulnerability, we will explain our reasoning to you.  Common reasons for rejection include:
    *   The issue is not a security vulnerability.
    *   The issue has already been reported.
    *   The issue is outside the scope of our security policy.
    *   The issue is a known limitation or a feature request.

**Responsible Disclosure:**

We ask that you refrain from publicly disclosing any vulnerability information until we have had a reasonable opportunity to investigate and address the issue.  This helps protect our users.

**Scope:**

This security policy applies to the WeChat Mini Program application and its interactions with our backend services.  It specifically covers vulnerabilities related to:

*   **Data Security:**  Unauthorized access to or modification of user data.
*   **Authentication and Authorization:**  Circumventing authentication or authorization mechanisms.
*   **Code Injection:**  Executing arbitrary code within the Mini Program or on our servers.
*   **Cross-Site Scripting (XSS):**  Injecting malicious scripts into the Mini Program's user interface.
*   **Cross-Site Request Forgery (CSRF):**  Performing unauthorized actions on behalf of a user.
*   **API Security:**  Exploiting vulnerabilities in our APIs or third-party APIs.
*   **Denial of Service (DoS):**  Disrupting the availability of the Mini Program or our services.

**Out of Scope:**

The following are generally considered out of scope:

*   Vulnerabilities in third-party libraries or frameworks, unless they directly impact the security of our Mini Program.
*   Social engineering attacks.
*   Physical security vulnerabilities.
*   Denial of service attacks that do not directly target our Mini Program or its APIs.
*   Issues that require physical access to a user's device.
*   Clickjacking attacks that do not result in a significant security impact.
*   Best practice violations that do not have a direct security impact.
*   Vulnerabilities that have already been publicly disclosed.

**API Specific Considerations:**

Since your Mini Program utilizes external APIs, the following security aspects are crucial:

*   **API Authentication:**  Ensure you are using secure authentication methods (e.g., API keys, OAuth 2.0) for all API requests.  Store API keys securely and avoid hardcoding them in your Mini Program code.  Use environment variables or secure configuration management.
*   **API Authorization:**  Implement proper authorization controls to ensure that users can only access the data and functionality that they are authorized to access.
*   **Input Validation:**  Thoroughly validate all input data from users and from external APIs to prevent injection attacks (e.g., SQL injection, command injection).
*   **Rate Limiting:**  Implement rate limiting on your API endpoints to prevent abuse and denial-of-service attacks.
*   **Data Encryption:**  Encrypt sensitive data both in transit (using HTTPS) and at rest.
*   **Error Handling:**  Implement robust error handling to prevent sensitive information from being leaked in error messages.  Avoid displaying technical details to the user.  Log errors securely for debugging.
*   **API Documentation:**  Maintain accurate and up-to-date documentation of your APIs, including security considerations.
*   **Regular Security Audits:**  Conduct regular security audits of your Mini Program and its API integrations to identify and address potential vulnerabilities.
*   **Third-Party API Security:**  Carefully evaluate the security of any third-party APIs you use.  Stay informed about security vulnerabilities in those APIs and take appropriate mitigation measures.  Review their security policies.

**Legal:**

We reserve the right to modify this security policy at any time.  Your participation in our vulnerability disclosure program is voluntary, and we may terminate it at any time. By submitting a vulnerability report, you agree that we may use the information you provide to improve the security of our products and services.

Thank you for helping us keep our Mini Program secure!

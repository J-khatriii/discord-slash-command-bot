<div align="center">

# 🧠 AI_NOTES

<p><i>How I used AI throughout development, the decisions I made myself, and the problems I solved while building this project.</i></p>

</div>

<br />

## 🤖 AI Tools Used

I used a mix of **ChatGPT** and **Claude** to build the original version —
ChatGPT for the initial scaffolding and first pass at the backend/frontend
structure, Claude for reviewing that output, catching what was broken, and
implementing fixes.

Rather than asking AI to build the entire application, I used it to:

* Understand Discord's Interactions API and request verification.
* Design the backend architecture.
* Review implementation choices.
* Generate repetitive boilerplate code.
* Review the project against the assignment requirements before deployment.

Beyond that first pass, **Claude AI** was used across
several follow-up sessions to: review the project against the assignment's
requirements, implement fixes directly (verified with local integration
tests, not just read-throughs), redesign the login/dashboard UI, debug
runtime errors after deploying to Render/Vercel.


<br />

## 🎯 Decisions I Made Myself

<table>
<tr><th>Decision</th><th>Why</th></tr>

<tr>
<td>Layered backend architecture (Routes → Controllers → Services → Repositories)</td>
<td>Keeps HTTP handling, business logic, and database access separate and easier to maintain.</td>
</tr>

<tr>
<td>Neon PostgreSQL</td>
<td>Free hosted PostgreSQL with no credit card requirement and simple integration with Render.</td>
</tr>

<tr>
<td>Discord Webhook as the mirror channel</td>
<td>Simpler to configure and fully tested end-to-end for this project.</td>
</tr>

<tr>
<td>Mirror status stored in the database</td>
<td>Makes webhook failures visible in the dashboard instead of only appearing in server logs.</td>
</tr>

<tr>
<td>JWT authentication for the dashboard</td>
<td>Protects all dashboard routes while keeping authentication lightweight.</td>
</tr>

<tr>
<td>Command configuration stored in memory</td>
<td>The assignment only required configurable behavior. An in-memory configuration demonstrated the feature without adding unnecessary database complexity.</td>
</tr>

</table>

<br />

## 🐞 The Bugs That Actually Mattered

These were problems that only appeared once the application was connected to real services.

<table>
<tr><th>Bug</th><th>Why It Mattered</th><th>How I Solved It</th></tr>

<tr>
<td>Discord endpoint verification</td>
<td>Discord refused to register the interactions endpoint until it correctly responded to <code>PING</code> requests.</td>
<td>Added proper <code>PING → PONG</code> handling before processing commands.</td>
</tr>

<tr>
<td>Duplicate interactions</td>
<td>Discord may retry delivering an interaction, which could cause duplicate database records and duplicate webhook notifications.</td>
<td>Stored Discord interaction IDs and ignored duplicate requests before executing side effects.</td>
</tr>

<tr>
<td>Command configuration wasn't respected</td>
<td>Disabling <code>/report</code> from the dashboard had no effect because the interaction handler still executed the command.</td>
<td>Added command enable/disable validation before dispatching the command handler.</td>
</tr>

<tr>
<td>CORS after deployment</td>
<td>Login worked, but authenticated API requests failed because the backend rejected the frontend origin.</td>
<td>Fixed the <code>FRONTEND_URL</code> environment variable (removed the trailing slash) and redeployed the backend.</td>
</tr>

<tr>
<td>Environment variables after deployment</td>
<td>The deployed frontend initially continued calling <code>localhost</code> instead of the Render backend.</td>
<td>Updated <code>VITE_API_URL</code> in Vercel and redeployed the frontend.</td>
</tr>

<tr>
<td>Database schema updates</td>
<td>Adding new columns required updating the existing Neon database instead of only modifying the schema file.</td>
<td>Applied the necessary SQL changes directly to the live database before redeploying.</td>
</tr>

</table>

<br />

## 💬 A Debugging Moment

One issue that took longer than expected happened after deployment.

The login page worked correctly, but every authenticated request failed with a browser CORS error. At first, it looked like JWT authentication was broken because login succeeded while every protected endpoint failed.

After inspecting the browser console and backend configuration, I discovered that the backend's `FRONTEND_URL` environment variable contained a trailing slash:

```text
https://my-app.vercel.app/
```

while the browser origin was:

```text
https://my-app.vercel.app
```

Since browsers compare origins exactly, the mismatch caused every authenticated request to fail.

Removing the trailing slash and redeploying the backend immediately resolved the issue.

<br />

## 🚀 What I'd Improve With More Time

* Store command configuration in PostgreSQL instead of memory.
* Add Discord modal interactions for `/report`.
* Add interactive message buttons.
* Integrate Google Gemini to summarize or categorize reports automatically.
* Implement background retry jobs for failed mirror notifications.
* Support multiple Discord servers with independent configuration.
* Add structured logging and monitoring for production deployments.

<br />

## 📚 Reflection

This project required much more than writing backend endpoints or React components. It involved connecting Discord Interactions, request signature verification, PostgreSQL, JWT authentication, webhook integrations, deployment on Render and Vercel, and debugging issues that only appeared after all services were connected.

AI significantly accelerated development by explaining unfamiliar concepts, reviewing code, and helping debug problems. However, every feature was manually integrated, tested, and validated before becoming part of the final application, making the development process a combination of AI assistance and hands-on engineering.
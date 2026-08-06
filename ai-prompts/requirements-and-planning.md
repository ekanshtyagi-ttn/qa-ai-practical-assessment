# AI Prompts — Requirements and Planning

Session notes from early planning chats. I kept prompts short and asked AI not to jump to code until scope was clear.

---

## Entry 1 — What does the assessment actually want?

**Prompt:**
```
Read the QA AI Capability Exercise participant guide. List Part A deliverables and Part B 
acceptance criteria only. Don't write any automation yet.
```

**AI response (summary):**  
SUT is practicesoftwaretesting.com. Deliverables include project-info.md, manual CSV, automation, ai-prompts/, execution reports, public git with iterative commits. UI AC1 = register/login/profile; AC2 = browse/cart/COD/invoice. API AC1 = register/login/token/cart; AC2 = products/cart/invoice.

**What I did next:**  
Used this as a checklist while building the repo. Cross-checked against the PDF — AI missed mentioning `tool-workflow.md` initially, so I added it after re-reading the submission guidelines.

---

## Entry 2 — Risk brainstorm (before touching the app)

**Prompt:**
```
I'm testing Toolshop e-commerce (practicesoftwaretesting.com). What are the top 5 QA risks 
for UI and API? Think checkout, auth, flaky tests, test data.
```

**AI response (summary):**  
Cloudflare, demo account lockout, password validation, billing address rules on invoice API, brittle locators, cart session handling.

**Validation:**  
Spent 30 min on the live app + Swagger. Risks were mostly accurate. Billing validation was worse than AI suggested — real cities all failed until I found the TG/Hesselbury example in the guide.

---

## Entry 3 — Smoke vs regression split

**Prompt (first attempt — too vague):**
```
Give me some test cases for Toolshop.
```
→ Got a generic list of 15+ cases. Too many.

**Prompt (refined):**
```
Propose exactly 6 UI and 6 API automated tests for Toolshop. Tag @Smoke or @Regression. 
Stay within assessment limit of 5-8 per tier. Map to AC1 and AC2.
```

**AI response (summary):**  
Smoke = auth + catalog (UI), auth+cart and product+invoice (API). Regression = negative login, E2E checkout, search, profile (UI); invalid login, bad cart invoice, search, /users/me (API).

**Validation:**  
Mapped IDs to CSV and spec files. This split felt right for a 2-hour smoke vs overnight regression mental model.

---

## Entry 4 — Folder structure

**Prompt:**
```
Design a Playwright JS project layout: pages, api clients, utils, tests/ui, tests/api, 
reports. Keep dependencies minimal (dotenv only unless justified).
```

**AI response (summary):**  
Suggested POM under `pages/`, API wrappers under `api/`, shared `dataGenerator`, tag-based grep for npm scripts. Originally proposed Playwright fixtures — I later swapped to Mocha harness (see automation-and-debugging.md Entry 6).

**Validation:**  
Ended up as `Projectstructure/` — renamed from an earlier scaffold name for clarity.

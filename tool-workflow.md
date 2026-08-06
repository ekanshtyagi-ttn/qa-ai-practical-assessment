# AI Tool Workflow — Toolshop Assessment

**Tool:** Cursor (Composer / Auto for planning & docs, premium model for automation)  
**Author:** Ekansh Tyagi  
**Period:** Jul–Aug 2026

This document describes how I actually used AI during the assessment — not a perfect linear process, but the workflow that worked for me.

---

## Phase 1 — Understand before automating

**Goal:** Know what the assessment expects and what the SUT does.

| Step | What I did | AI role |
|------|-----------|---------|
| 1 | Pasted the participant guide into Cursor | AI extracted deliverables, AC1/AC2, case limits (5–8 per tier) |
| 2 | Opened Toolshop UI + Swagger docs manually | I verified URLs and flows myself first |
| 3 | Asked AI to draft a risk list | AI suggested Cloudflare, password validation, billing quirks — I validated each |

**Key decision:** I did not let AI write automation until I had manually walked through register → checkout → invoice once. That saved a lot of rework.

**Prompt pattern that worked:**
> "Read this assessment brief. List only Part A deliverables and Part B acceptance criteria. Do not suggest code yet."

**What I avoided sharing:** internal credentials, unrelated project context, or large unrelated code dumps.

---

## Phase 2 — Test design (manual first)

**Goal:** `FunctionalTestCase.csv` with traceable IDs before any Playwright code.

1. Asked AI for 8 manual cases covering AC1 + AC2 + API flows.
2. **Reviewed every step** against the live app — caught missing "press Confirm twice" on invoice.
3. Tagged Smoke vs Regression and linked Requirement IDs.

AI was fast at CSV structure; I owned the accuracy of steps and expected results.

**Iteration example:** First draft had generic checkout steps. I refined the prompt:
> "Add explicit double-Confirm step for invoice generation — this is called out in the assessment guide."

---

## Phase 3 — Automation scaffold

**Goal:** Playwright + Page Object Model, UI and API in one repo.

| Chat focus | Outcome |
|------------|---------|
| Folder layout | `Projectstructure/` with `pages/`, `api/`, `helpers/`, `tests/` |
| Page objects | One class per screen; prefer `[data-test]` locators |
| API clients | Thin wrappers over Playwright `request` context |
| Test data | `dataGenerator.js` — unique email/password every run |

**Framework evolution (honest note):** I started with Playwright's built-in test runner and custom fixtures. Midway I switched to **Mocha + Mochawesome** because I wanted familiar `describe`/`it` structure and HTML reports I could share easily. AI helped migrate specs without rewriting page objects.

---

## Phase 4 — Debug loop (where AI helped most)

Real failures I hit and how I used AI:

| Failure | AI helped with | My validation |
|---------|----------------|---------------|
| Register 422 — password in breach list | Suggested unique high-entropy passwords | Re-ran register → 201 |
| Invoice 422 — city/country mismatch | Pointed to TG/Hesselbury sandbox payload | Probed API manually, confirmed 201 |
| Checkout — invoice not created | Reminded about double Confirm | Added `confirmInvoiceTwice()` helper |
| Flaky proceed button | Suggested wait for enabled state | Ran headed mode, watched the UI |

**Rule I followed:** Never merge AI-suggested assertions without running the test locally at least once.

---

## Phase 5 — Documentation & submission

| Artifact | How AI was used |
|----------|-----------------|
| `readme.md` | Draft structure; I fixed paths after folder rename |
| `project-info.md` | AI filled section templates; I added real test IDs and dates |
| `ai-prompts/` | Summarized each chat after completing a phase |
| `tool-workflow.md` | This file — written from actual session notes |
| Execution reports | Ran `npm test`; Mochawesome HTML committed as evidence |

---

## Model selection (token budget)

| Task | Model |
|------|-------|
| CSV, README, planning | Auto / Composer |
| Playwright code, debugging | Premium |
| `/review-bugbot` on changes | Bugbot subagent |

One focused chat per phase. I summarized outcomes into `ai-prompts/` before starting the next topic — keeps context clean and creates an audit trail for evaluators.

---

## Reuse in a real project

1. **Requirements chat** → risk + traceability  
2. **Manual design chat** → CSV / test management import  
3. **Automation chat** → POM + API clients per feature  
4. **Debug chat** → one failure at a time with logs attached  
5. **Prompt log** → `ai-prompts/` for team onboarding  

---

## Quick reference

```
Assessment repo/
├── readme.md                  ← start here
├── project-info.md            ← workflow answers (Part A)
├── tool-workflow.md           ← this file
├── FunctionalTestCase.csv     ← manual cases
├── api-test-scenarios.md      ← API scenario catalogue
├── automation-opportunities.md
├── exploratory-testing-notes.md
├── defect-report.md
├── ai-prompts/                ← prompt history by phase
└── Projectstructure/          ← automation + reports
```

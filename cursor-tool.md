# Cursor / AI Tool — Rules, Workflow & Skills

**Candidate:** Ekansh Tyagi  
**Primary tool:** [Cursor](https://cursor.com/) (Composer / Auto + premium model for automation)

For the full phased workflow narrative, see also **[tool-workflow.md](./tool-workflow.md)**.

---

## AI Tools Used

| Tool | Primary use in this project | Record |
|------|----------------------------|--------|
| **Cursor** | Requirements, test design, Playwright automation, debugging, documentation | `ai-prompts/` + chat history |
| **Cursor Bugbot** | Review local changes before merge (`/review-bugbot`) | automation-and-debugging.md Entry 6 |

Planning, implementation, and documentation were all done in Cursor across separate focused chats (one topic per session).

---

## Cursor — Project Rules

Custom rules live in **`.cursor/rules/toolshop-qa-assessment.mdc`**:

| Rule | Purpose |
|------|---------|
| Playwright + Mocha + Mochawesome layout | Consistent folder structure |
| 5–8 cases per tier, @Smoke / @Regression | Assessment constraints |
| `data-test` locators first | Stable UI automation |
| Unique emails via `dataGenerator` | Avoid duplicate-user failures |
| TG/Hesselbury billing + double Confirm | Known SUT quirks |
| Minimal dependencies | dotenv, mocha, mochawesome, cross-env only |
| Reports under `execution-reports/mochawesome/` | Submission evidence |

Workspace rules also enforced: no secrets in repo, minimal diffs, run tests after behaviour changes.

---

## Prompt Library (`ai-prompts/`)

The prompt library acted as reusable context across sessions — similar to Cursor Skills:

| File | Role |
|------|------|
| `requirements-and-planning.md` | Scope, risks, smoke/regression split |
| `test-design.md` | Manual + UI scenario design |
| `test-design-API.md` | API scenario design |
| `test-data.md` | Payloads, billing, password rules |
| `automation-and-debugging.md` | Framework, Mocha migration, debug loops |
| `documentation-and-summary.md` | README, submission polish |

---

## Effective Practices (self-imposed)

| Practice | Why |
|----------|-----|
| Manual CSV before automation | Catch UX quirks (double Confirm) early |
| Validate AI assertions against live SUT | AI guessed wrong billing payload initially |
| API-seed UI sessions for slow flows | Faster E2E checkout setup |
| Headed runs for UI debugging | Watched proceed-button enable logic |
| One chat per phase | Cleaner context + better prompt log |
| Small git commits | Shows iteration to evaluators |

---

## Model Selection

| Task | Model |
|------|-------|
| CSV, README, planning docs | Auto / Composer |
| Playwright code, hard debugging | Premium |
| Bugbot review | Bugbot subagent |

---

## One-paragraph summary (for assessors)

> **Cursor** was used end-to-end for this assessment: requirement extraction, risk analysis, manual test design (`FunctionalTestcase.csv`), Playwright UI/API automation with Page Object Model (`Projectstructure/`), Mocha + Mochawesome reporting, exploratory notes, defect RCA, and submission documentation. Prompts were iterated when AI output was too generic or factually wrong (billing validation, password breach check). All AI-generated tests were run locally before commit. Reusable prompts are archived in `ai-prompts/`; workflow phases are documented in `tool-workflow.md`.

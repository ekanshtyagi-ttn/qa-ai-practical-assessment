# Cursor / AI Tool — Rules, Workflow & Skills

**Candidate:** Ekansh Tyagi  
**Primary tool:** [Cursor](https://cursor.com/) (Composer / Auto + premium model for automation)

---

## AI Tools Used

| Tool | Primary use | Record |
|------|-------------|--------|
| **Cursor** | Requirements, test design, Playwright automation, debugging, docs | `ai-prompts/` + chat history |
| **Cursor Bugbot** | Review local changes (`/review-bugbot`) | `automation-and-debugging.md` |

Planning, implementation, and documentation were done in Cursor across separate focused chats (one topic per session).

---

## Cursor — Effective Rules

| Rule | Purpose |
|------|---------|
| Page Object Model for UI; API clients for API | Maintainability |
| Tag tests `@Smoke`, `@Regression` | Selective execution |
| Dynamic test data per run (unique email/password) | Avoid duplicate-user failures |
| `data-test` locators first | Stable UI automation |
| TG/Hesselbury billing + double Confirm | Known SUT quirks |
| Minimal dependencies | dotenv, mocha, mochawesome, cross-env only |
| Mochawesome reports under `execution-reports/` | Submission evidence |

Workspace rules enforced: no secrets in repo, minimal diffs, run tests after behaviour changes.

---

## Prompt Library (`ai-prompts/`)

| File | Role |
|------|------|
| `requirements-and-planning.md` | Scope, risks, smoke/regression split |
| `test-design.md` | Manual + UI scenario design |
| `test-design-API.md` | API scenario design |
| `test-data.md` | Payloads, billing, password rules |
| `automation-and-debugging.md` | Framework setup, Mocha migration, debug loops |

---

## Workflow Phases

1. **Understand** — Extract deliverables and AC1/AC2 from assessment brief; manual walkthrough of SUT
2. **Design** — Manual CSV first; tag Smoke/Regression; map IDs for traceability
3. **Automate** — POM + API clients + Mocha specs; validate every AI assertion locally
4. **Debug** — Headed runs for UI; API probes for 422 errors; iterate prompts when AI was wrong
5. **Document** — `project-info.md`, `cursor-tool.md`, execution reports; push iterative commits

**Prompt iteration example:** First test-design prompt produced generic checkout steps; refined to explicitly require double Confirm after manual testing revealed missing invoice.

---

## Model Selection

| Task | Model |
|------|-------|
| CSV, README, planning docs | Auto / Composer |
| Playwright code, hard debugging | Premium |
| Bugbot review | Bugbot subagent |

---

## One-paragraph summary (for assessors)

> **Cursor** was used end-to-end: requirement extraction, risk analysis, manual test design (`FunctionalTestcase.csv`), Playwright UI/API automation with POM (`Playwright Framework + Report/`), Mocha + Mochawesome reporting, exploratory findings, defect RCA (in `project-info.md`), and submission documentation. Prompts were iterated when AI output was generic or wrong (billing validation, password breach). All tests were run locally before commit. Reusable prompts are in `ai-prompts/`.

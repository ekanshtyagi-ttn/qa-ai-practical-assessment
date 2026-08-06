# Practice Software Testing – QA Automation Framework

Playwright-based automation framework for **UI** and **API** testing of the [Practice Software Testing Toolshop](https://practicesoftwaretesting.com).

For AI-assisted workflow, test strategy, and project background, see **[project-info.md](./project-info.md)**.

---

## Project Information

| Item | Detail |
|------|--------|
| **Framework** | [Playwright](https://playwright.dev/) + Mocha + Mochawesome (JavaScript) |
| **Design pattern** | Page Object Model (UI) + API client layer (API) |
| **UI SUT** | https://practicesoftwaretesting.com |
| **API SUT** | https://api.practicesoftwaretesting.com |
| **Browser** | Chromium (headed mode via `npm run test:headed`) |
| **Manual test cases** | [FunctionalTestcase.csv](./FunctionalTestcase.csv) |
| **AI workflow** | [cursor-tool.md](./cursor-tool.md) · [tool-workflow.md](./tool-workflow.md) |

---

## Submission Deliverables

| Requirement | Location |
|-------------|----------|
| README with project overview | This file |
| Manual test cases | `FunctionalTestcase.csv` |
| API test scenarios | `api-test-scenarios.md` |
| Automation opportunities | `automation-opportunities.md` |
| UI + API automation | `Projectstructure/tests/` |
| Exploratory testing notes | `exploratory-testing-notes.md` |
| Defect report / RCA | `defect-report.md` |
| AI prompts | `ai-prompts/` |
| AI workflow documentation | `cursor-tool.md` |
| Execution evidence | `Projectstructure/execution-reports/` |

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- Internet access to reach the public demo application

---

## Installation

```bash
git clone <your-repo-url>
cd qa-ai-practical-assessment/Projectstructure

npm install
npx playwright install chromium
```

### Environment setup

```bash
copy .env.example .env    # Windows
# cp .env.example .env    # macOS/Linux
```

| Variable | Default | Description |
|----------|---------|-------------|
| `UI_BASE_URL` | `https://practicesoftwaretesting.com` | UI application URL |
| `API_BASE_URL` | `https://api.practicesoftwaretesting.com` | API base URL |
| `HEADED` | _(unset)_ | Set to `1` for visible browser |

---

## Project Structure

```
qa-ai-practical-assessment/
├── FunctionalTestcase.csv         # Manual test cases
├── api-test-scenarios.md          # API scenario catalogue
├── automation-opportunities.md    # Automation ROI analysis
├── exploratory-testing-notes.md   # Exploratory session notes
├── defect-report.md               # Observations + RCA
├── project-info.md                # Part A workflow answers
├── cursor-tool.md                 # Cursor rules & AI workflow
├── tool-workflow.md               # Phased AI usage narrative
├── ai-prompts/                      # Prompt history by phase
└── Projectstructure/              # Automation framework
    ├── api/                       # AuthApi, CartApi, ProductApi, InvoiceApi
    ├── pages/                     # Page Object Model classes
    ├── helpers/                   # Mocha test harness
    ├── utils/                     # dataGenerator, uiFlows, constants
    ├── testdata/                  # Billing JSON payloads
    ├── tests/
    │   ├── ui/                    # 6 UI specs (@Smoke / @Regression)
    │   └── api/                   # 6 API specs (@Smoke / @Regression)
    └── execution-reports/         # Mochawesome + execution summary
```

---

## Running Tests

All commands run from `Projectstructure/`:

| Command | Description |
|---------|-------------|
| `npm test` | Full UI + API suite (12 tests) |
| `npm run test:ui` | UI tests only |
| `npm run test:api` | API tests only |
| `npm run test:smoke` | `@Smoke` tagged tests |
| `npm run test:regression` | `@Regression` tagged tests |
| `npm run test:headed` | UI tests with visible browser |
| `npm run report` | Open Mochawesome HTML report |

### Run a single spec

```bash
npx mocha "tests/ui/toolshop.ui.spec.js" --config .mocharc.cjs
npx mocha "tests/api/toolshop.api.spec.js" --config .mocharc.cjs
```

---

## Test Suite Summary

### UI (6 cases) — `tests/ui/toolshop.ui.spec.js`

| ID | Title | Tag |
|----|-------|-----|
| TC-UI-S01 | Register and login with valid credentials | @Smoke |
| TC-UI-S02 | Browse product catalog and open product detail | @Smoke |
| TC-UI-R01 | Login fails with invalid password | @Regression |
| TC-UI-R02 | End-to-end purchase with COD and invoice confirmation | @Regression |
| TC-UI-R03 | Search returns matching products | @Regression |
| TC-UI-R04 | Profile displays registered user details | @Regression |

### API (6 cases) — `tests/api/toolshop.api.spec.js`

| ID | Title | Tag |
|----|-------|-----|
| TC-API-S01 | Register, login, and create cart (AC1) | @Smoke |
| TC-API-S02 | Add products and generate invoice (AC2) | @Smoke |
| TC-API-R01 | Login rejected for unknown credentials | @Regression |
| TC-API-R02 | Invoice creation fails for invalid cart id | @Regression |
| TC-API-R03 | Product search returns results for known keyword | @Regression |
| TC-API-R04 | Authenticated /users/me returns profile | @Regression |

---

## Test Data

| File | Purpose |
|------|---------|
| `utils/dataGenerator.js` | Unique emails, passwords, registration payloads per run |
| `utils/constants.js` | `BILLING` payload (TG/Hesselbury sandbox) |
| `testdata/billing.json` | Valid and invalid invoice payloads |
| `.env` | Runtime URLs (optional — defaults work) |

Credentials are generated uniquely per run to avoid duplicate-email and password-breach failures on the demo API.

---

## Reports and Execution Evidence

| Output | Location | How to open |
|--------|----------|-------------|
| **Execution summary** | `execution-reports/EXECUTION-SUMMARY.md` | Markdown viewer |
| **Mochawesome HTML** | `execution-reports/mochawesome/index.html` | `npm run report` |
| **Mochawesome JSON** | `execution-reports/mochawesome/index.json` | Any JSON viewer |

**Latest run:** 12 passed, 0 failed (~2 min)

---

## Manual Test Cases

Functional/manual test cases are in **[FunctionalTestcase.csv](./FunctionalTestcase.csv)** (8 cases).

Columns: Test Case ID, Requirement ID, Title, Type, Category, Priority, Preconditions, Test Steps, Expected Result, Status.

---

## Troubleshooting

| Issue | Suggestion |
|-------|------------|
| `No test files found` | Use `npm test` (includes glob) or `npx mocha "tests/**/*.spec.js"` |
| Register 422 (password breach) | Tests use unique passwords via `dataGenerator.js` |
| Invoice 422 (billing) | Use TG/Hesselbury payload in `constants.js` |
| Invoice missing after checkout | Press Confirm **twice** — see `defect-report.md` |
| UI flake on checkout | Run `npm run test:headed` and watch proceed buttons |
| Chromium not installed | `npx playwright install chromium` |

---

## AI Prompt Library

```
ai-prompts/
├── requirements-and-planning.md
├── test-design.md
├── test-design-API.md
├── test-data.md
├── automation-and-debugging.md
└── documentation-and-summary.md
```

See **[cursor-tool.md](./cursor-tool.md)** for Cursor rules, model selection, and workflow summary.

---

## Reference

This submission follows the structure and completeness of the sample assessment repository:  
[shivadev-ttn/qa-ai-practical-assessment](https://github.com/shivadev-ttn/qa-ai-practical-assessment)

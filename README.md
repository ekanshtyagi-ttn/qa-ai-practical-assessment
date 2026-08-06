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
| **Browser** | Chromium (headed via `npm run test:headed`) |
| **Manual test cases** | [FunctionalTestcase.csv](./FunctionalTestcase.csv) |

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- Internet access to reach the public demo application

---

## Installation

```bash
git clone https://github.com/ekanshtyagi-ttn/qa-ai-practical-assessment.git
cd qa-ai-practical-assessment/"Playwright Framework + Report"

npm install
npx playwright install chromium
```

### Environment setup

```bash
copy .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `UI_BASE_URL` | `https://practicesoftwaretesting.com` | UI application URL |
| `API_BASE_URL` | `https://api.practicesoftwaretesting.com` | API base URL |
| `HEADED` | _(unset)_ | Set to `1` for visible browser |

---

## Project Structure

```
Playwright Framework + Report/
├── api/                  # AuthApi, CartApi, ProductApi, InvoiceApi
├── pages/                # Page Object Model classes
├── helpers/              # Mocha test harness
├── utils/                # dataGenerator, uiFlows, constants
├── testdata/             # Billing JSON payloads
├── tests/
│   ├── ui/               # 6 UI specs (@Smoke / @Regression)
│   └── api/              # 6 API specs (@Smoke / @Regression)
├── execution-reports/    # Mochawesome HTML/JSON + execution summary
├── .mocharc.cjs
├── package.json
└── .env.example
```

---

## Running Tests

All commands run from `Playwright Framework + Report/`:

| Command | Description |
|---------|-------------|
| `npm test` | Full UI + API suite (12 tests) |
| `npm run test:ui` | UI tests only |
| `npm run test:api` | API tests only |
| `npm run test:smoke` | `@Smoke` tagged tests |
| `npm run test:regression` | `@Regression` tagged tests |
| `npm run test:headed` | Visible browser (UI) |
| `npm run report` | Open Mochawesome HTML report |

### Run a single spec

```bash
npx mocha "tests/ui/toolshop.ui.spec.js" --config .mocharc.cjs
npx mocha "tests/api/toolshop.api.spec.js" --config .mocharc.cjs
```

---

## Test Suite Summary

### UI (6 cases)

| ID | Title | Tag |
|----|-------|-----|
| TC-UI-S01 | Register and login with valid credentials | @Smoke |
| TC-UI-S02 | Browse product catalog and open product detail | @Smoke |
| TC-UI-R01 | Login fails with invalid password | @Regression |
| TC-UI-R02 | End-to-end purchase with COD and invoice confirmation | @Regression |
| TC-UI-R03 | Search returns matching products | @Regression |
| TC-UI-R04 | Profile displays registered user details | @Regression |

### API (6 cases)

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

Credentials are generated uniquely per run to avoid duplicate-email conflicts on the demo API.

---

## Reports and Logs

| Output | Location | How to open |
|--------|----------|-------------|
| **Execution summary** | `execution-reports/EXECUTION-SUMMARY.md` | Markdown viewer |
| **Mochawesome HTML** | `execution-reports/mochawesome/index.html` | `npm run report` |
| **Mochawesome JSON** | `execution-reports/mochawesome/index.json` | Any JSON viewer |
| **Screenshots** | `execution-reports/screenshots/` | Image viewer |

**Latest run:** 12 passed, 0 failed (~2 min)

---

## Manual Test Cases

Functional/manual test cases are maintained in:

```
FunctionalTestcase.csv
```

Columns: Test Case ID, Requirement ID, Title, Type, Category, Priority, Preconditions, Test Steps, Expected Result, Status.

---

## Troubleshooting

| Issue | Suggestion |
|-------|------------|
| Chromium not found | `npx playwright install chromium` |
| Register 422 (password breach) | Tests use unique passwords via `dataGenerator.js` |
| Invoice 422 (billing) | Use TG/Hesselbury payload in `constants.js` |
| Invoice missing after checkout | Press Confirm **twice** — see `project-info.md` |
| UI flake on checkout | Run `npm run test:headed` and watch proceed buttons |

---

## AI Prompt Library

```
ai-prompts/
├── requirements-and-planning.md
├── test-design.md
├── test-design-API.md
├── test-data.md
└── automation-and-debugging.md
```

## AI Workflow Documentation

| File | Purpose |
|------|---------|
| **[tool-workflow.md](./tool-workflow.md)** | Assessment deliverable — AI workflow summary |
| **[cursor-tool.md](./cursor-tool.md)** | Full Cursor rules, phases, model selection, assessor summary |

The assessment brief asks for `tool-workflow.md`; this repo uses Cursor, so workflow details live in `cursor-tool.md` with a short index in `tool-workflow.md`.

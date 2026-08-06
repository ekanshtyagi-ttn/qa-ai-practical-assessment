# Execution Summary

**Date:** 06-Aug-2026  
**Environment:** Windows 11, Node.js 24.x, Chromium (Playwright 1.54.2)  
**Command:** `npm test` (from `Playwright Framework + Report/`)

## Results

| Suite | Passed | Failed | Duration |
|-------|--------|--------|----------|
| API Smoke @Smoke | 2 | 0 | ~4s |
| API Regression @Regression | 4 | 0 | ~8s |
| UI Smoke @Smoke | 2 | 0 | ~22s |
| UI Regression @Regression | 4 | 0 | ~70s |
| **Total** | **12** | **0** | **~2 min** |

## Test cases executed

### API
- TC-API-S01 — Register, login, and create cart (AC1)
- TC-API-S02 — Add products and generate invoice (AC2)
- TC-API-R01 — Login rejected for unknown credentials
- TC-API-R02 — Invoice creation fails for invalid cart id
- TC-API-R03 — Product search returns results for known keyword
- TC-API-R04 — Authenticated /users/me returns profile

### UI
- TC-UI-S01 — Register and login with valid credentials
- TC-UI-S02 — Browse product catalog and open product detail
- TC-UI-R01 — Login fails with invalid password
- TC-UI-R02 — End-to-end purchase with COD and invoice confirmation
- TC-UI-R03 — Search returns matching products
- TC-UI-R04 — Profile displays registered user details

## Evidence artifacts

| Artifact | Path |
|----------|------|
| Mochawesome HTML report | `execution-reports/mochawesome/index.html` |
| Mochawesome JSON | `execution-reports/mochawesome/index.json` |
| Screenshots | `execution-reports/screenshots/` |

### Screenshots

| File | Description |
|------|-------------|
| `01-home-catalog.png` | Toolshop product catalog (UI SUT) |
| `02-product-detail.png` | Product detail page under test |
| `03-login-page.png` | Login page (auth flow) |
| `04-mochawesome-report.png` | Full Mochawesome HTML report (12/12 passed) |

Open the HTML report locally:

```bash
cd "Playwright Framework + Report"
npm run report
```

## Notes

- UI E2E checkout (TC-UI-R02) is the longest test (~45s) due to multi-step checkout and invoice confirmation.
- API tests run headless over HTTP — no browser window required.
- For headed UI debugging: `npm run test:headed -- tests/ui/toolshop.ui.spec.js`

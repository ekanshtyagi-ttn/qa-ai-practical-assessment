# API Test Scenarios — Toolshop

**Base URL:** `https://api.practicesoftwaretesting.com`  
**Docs:** https://api.practicesoftwaretesting.com/api/documentation  
**Automation:** `Projectstructure/tests/api/toolshop.api.spec.js`

---

## AC1 — Authentication & cart lifecycle

| ID | Scenario | Method / Endpoint | Expected | Tag | Automated |
|----|----------|-------------------|----------|-----|-----------|
| TC-API-S01 | Register new user with valid payload | `POST /users/register` | 201 Created | Smoke | ✓ |
| TC-API-S01 | Login with registered credentials | `POST /users/login` | 200 + `access_token` | Smoke | ✓ |
| TC-API-S01 | Create empty shopping cart | `POST /carts` | 201 + `cart.id` | Smoke | ✓ |
| TC-API-R01 | Login with unknown user | `POST /users/login` | 401 Unauthorized | Regression | ✓ |
| TC-API-R04 | Get authenticated profile | `GET /users/me` + Bearer token | 200 + email match | Regression | ✓ |

### Sample register payload
```json
{
  "first_name": "QA",
  "last_name": "Auto",
  "email": "qa.auto.<unique>@toolshop.test",
  "password": "QaTool#<unique>!",
  "dob": "1988-05-15",
  "phone": "0612345678",
  "address": {
    "street": "Damrak",
    "house_number": "1",
    "city": "Amsterdam",
    "state": "Noord-Holland",
    "country": "NL",
    "postal_code": "1012LG"
  }
}
```

---

## AC2 — Products, cart, and invoice

| ID | Scenario | Method / Endpoint | Expected | Tag | Automated |
|----|----------|-------------------|----------|-----|-----------|
| TC-API-S02 | List products (paginated) | `GET /products?page=1` | 200 + `data[]` | Smoke | ✓ |
| TC-API-S02 | Add product to cart | `POST /carts/{id}` | 200 | Smoke | ✓ |
| TC-API-S02 | Generate invoice (COD) | `POST /invoices` | 201 + `invoice_number` ~ INV- | Smoke | ✓ |
| TC-API-R02 | Invoice with invalid cart id | `POST /invoices` | 404 or 422 | Regression | ✓ |
| TC-API-R03 | Search products by keyword | `GET /products?search=Pliers` | 200 + results | Regression | ✓ |

### Invoice payload (sandbox — must use TG / Hesselbury)
```json
{
  "cart_id": "<uuid from POST /carts>",
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA",
  "payment_method": "cash-on-delivery",
  "payment_details": {}
}
```

---

## Negative & edge scenarios (manual / future automation)

| Scenario | Endpoint | Expected | Status |
|----------|----------|----------|--------|
| Register duplicate email | `POST /users/register` | 422 | Manual |
| Register weak/leaked password | `POST /users/register` | 422 | Mitigated in automation via `dataGenerator` |
| Invoice without auth header | `POST /invoices` | 401 | Future |
| Add product to non-existent cart | `POST /carts/{bad-id}` | 404 | Future |

---

## Traceability

| Requirement | API tests |
|-------------|-----------|
| AC1 — register, login, token, cart | TC-API-S01, TC-API-R01, TC-API-R04 |
| AC2 — products, cart, invoice | TC-API-S02, TC-API-R02, TC-API-R03 |

Manual counterparts: `FunctionalTestCase.csv` → TC-MAN-R05, TC-MAN-R06

---

## Run commands

```bash
cd Projectstructure
npm run test:api          # all 6 API tests
npm run test:api:smoke    # AC1 + AC2 smoke only
```

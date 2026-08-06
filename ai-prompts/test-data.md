# AI Prompts — Test Data

Most of my API debugging time went here. AI was helpful for schema shape; I validated payloads against live endpoints.

---

## Entry 1 — Unique user factory

**Prompt:**
```
Create a Node helper to generate Toolshop registration payloads: unique email, password 
with upper/lower/number/symbol, nested address per OpenAPI UserRequest. No faker dependency.
```

**AI response (summary):**  
`dataGenerator.js` with `buildUser()` using timestamp suffix.

**Validation:**  
First version used static password `QaTest@123` — got 422 breach error. Changed to `QaTool#${suffix}!` after Entry 3 below.

---

## Entry 2 — Invoice billing (the painful one)

**Prompt:**
```
POST /invoices keeps returning 422: city does not belong to country. I tried Amsterdam NL 
and New York US. What billing payload works on practicesoftwaretesting API?
```

**AI response (summary):**  
Real geography often fails; assessment guide uses `billing_country: TG`, `billing_city: Hesselbury`, postal `1234AA`.

**Validation:**  
Tested in browser devtools + curl. TG payload returned 201 with `INV-` number. Saved to `constants.js` and `testdata/billing.json`.

---

## Entry 3 — Password breach 422

**Prompt:**
```
Registration returns 422: password appeared in data leak. How should I fix test data 
without disabling security?
```

**AI response (summary):**  
Use unique high-entropy passwords per run; avoid dictionary/tutorial passwords.

**Debugging outcome:**  
Updated `buildUser()` — register succeeds consistently now.

---

## Entry 4 — UI country dropdown mapping

**Prompt:**
```
API register uses country code NL. UI register form has a country select from countries.json. 
What label should Playwright selectOption use?
```

**AI response (summary):**  
Select `{ label: 'Netherlands (the)' }` — full name from dropdown, not ISO code.

**Validation:**  
Checked DOM on register page. Billing on checkout is separate — didn't mix the two.

---

## Entry 5 — Negative invoice payload

**Prompt:**
```
Give me a JSON payload for invoice regression test — invalid or missing cart_id. 
Expect 404 or 422.
```

**AI response (summary):**  
`invalidMissingCart` in `testdata/billing.json`.

**Validation:**  
TC-API-R02 asserts `[404, 422].toContain(status)` — API returns either depending on payload shape.

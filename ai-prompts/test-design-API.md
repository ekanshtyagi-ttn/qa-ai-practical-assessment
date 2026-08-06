# AI Prompts — API Test Design

Prompts used specifically for API scenario design, payload validation, and automation mapping.

---

## Entry 1 — AC1 flow breakdown

**Prompt:**
```
Break down API AC1 for Toolshop: register, login, bearer token, create cart. 
List endpoints, expected status codes, and assertions for a smoke test.
```

**AI response (summary):**  
POST /users/register (201) → POST /users/login (200, access_token) → POST /carts (201, id).

**Validation:**  
Probed with curl — matches OpenAPI docs. Became TC-API-S01.

---

## Entry 2 — AC2 invoice flow

**Prompt:**
```
Design API AC2 test: list products, add to cart, POST invoice with cash-on-delivery. 
What assertions prove invoice was created?
```

**AI response (summary):**  
GET /products, POST /carts/{id}, POST /invoices with cart_id + billing fields. Assert 201 and invoice_number matches INV-.

**Validation:**  
Failed until billing payload fixed (see test-data.md Entry 2). Final version in TC-API-S02.

---

## Entry 3 — Negative API cases

**Prompt:**
```
Suggest 3 API regression tests: invalid login, bad cart invoice, product search, 
authenticated profile. One line each with expected status.
```

**AI response (summary):**  
401 login, 404/422 invoice, 200 search, 200 /users/me.

**Validation:**  
Mapped to TC-API-R01 through R04. Documented in `api-test-scenarios.md`.

---

## Entry 4 — API scenario document

**Prompt:**
```
Turn my 6 automated API tests into a readable scenario catalogue with sample JSON 
payloads for register and invoice. Link to spec file path.
```

**AI response (summary):**  
Created `api-test-scenarios.md` with tables and payload examples.

**Edits I made:**  
Added traceability to manual TC-MAN-R05/R06 and run commands.

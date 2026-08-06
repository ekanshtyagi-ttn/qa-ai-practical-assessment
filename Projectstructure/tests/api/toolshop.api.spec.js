const { TestHarness, expect } = require('../../helpers/testHarness');
const { buildUser } = require('../../utils/dataGenerator');
const { BILLING } = require('../../utils/constants');
const billingData = require('../../testdata/billing.json');

describe('API Smoke @Smoke', function () {
  const harness = new TestHarness();

  beforeEach(async function () {
    await harness.launchApi();
  });

  afterEach(async function () {
    await harness.closeApi();
  });

  it('TC-API-S01 | Register, login, and create cart (AC1)', async function () {
    const user = buildUser();
    const register = await harness.authApi.register(user);
    expect(register.status()).toBe(201);

    const login = await harness.authApi.login(user.email, user.password);
    expect(login.status()).toBe(200);
    const loginBody = await login.json();
    expect(loginBody.access_token).toBeTruthy();

    const cart = await harness.cartApi.create();
    expect(cart.status()).toBe(201);
    const cartBody = await cart.json();
    expect(cartBody.id).toBeTruthy();
  });

  it('TC-API-S02 | Add products and generate invoice (AC2)', async function () {
    const user = buildUser();
    await harness.authApi.register(user);
    const login = await harness.authApi.login(user.email, user.password);
    const { access_token: token } = await login.json();

    const cart = await harness.cartApi.create();
    const { id: cartId } = await cart.json();

    const products = await harness.productApi.list(1);
    expect(products.status()).toBe(200);
    const productsBody = await products.json();
    const productId = productsBody.data[0].id;

    const add = await harness.cartApi.addProduct(cartId, productId, 1);
    expect(add.status()).toBe(200);

    const invoicePayload = {
      ...BILLING,
      cart_id: cartId,
    };
    const invoice = await harness.invoiceApi.create(token, invoicePayload);
    expect(invoice.status()).toBe(201);
    const invoiceBody = await invoice.json();
    expect(invoiceBody.invoice_number).toMatch(/INV-/);
    expect(invoiceBody.billing_country).toBe('TG');
  });
});

describe('API Regression @Regression', function () {
  const harness = new TestHarness();

  beforeEach(async function () {
    await harness.launchApi();
  });

  afterEach(async function () {
    await harness.closeApi();
  });

  it('TC-API-R01 | Login rejected for unknown credentials', async function () {
    const response = await harness.authApi.loginInvalid('ghost@toolshop.test', 'NoSuchPass!999');
    expect(response.status()).toBe(401);
  });

  it('TC-API-R02 | Invoice creation fails for invalid cart id', async function () {
    const user = buildUser();
    await harness.authApi.register(user);
    const login = await harness.authApi.login(user.email, user.password);
    const { access_token: token } = await login.json();

    const payload = {
      ...billingData.invalidMissingCart,
    };
    const response = await harness.invoiceApi.create(token, payload);
    expect([404, 422]).toContain(response.status());
  });

  it('TC-API-R03 | Product search returns results for known keyword', async function () {
    const response = await harness.productApi.search('Pliers');
    expect(response.status()).toBe(200);
    const body = await response.json();
    const items = body.data || body;
    expect(items.length).toBeGreaterThan(0);
  });

  it('TC-API-R04 | Authenticated /users/me returns profile', async function () {
    const user = buildUser();
    await harness.authApi.register(user);
    const login = await harness.authApi.login(user.email, user.password);
    const { access_token: token } = await login.json();

    const me = await harness.authApi.me(token);
    expect(me.status()).toBe(200);
    const profile = await me.json();
    expect(profile.email).toBe(user.email);
    expect(profile.first_name).toBe(user.first_name);
  });
});

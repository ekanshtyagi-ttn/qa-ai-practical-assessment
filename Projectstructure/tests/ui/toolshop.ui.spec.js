const { TestHarness, expect } = require('../../helpers/testHarness');
const { buildUser } = require('../../utils/dataGenerator');

describe('UI Smoke @Smoke', function () {
  const harness = new TestHarness();

  beforeEach(async function () {
    await harness.launchBrowser();
    await harness.launchApi();
  });

  afterEach(async function () {
    await harness.dispose();
  });

  it('TC-UI-S01 | Register and login with valid credentials', async function () {
    const user = buildUser();
    await harness.uiFlows.registerAndLogin(user);
    await harness.accountPage.openProfileTab();
    await expect(harness.page.locator('[data-test="email"]')).toHaveValue(user.email);
  });

  it('TC-UI-S02 | Browse product catalog and open product detail', async function () {
    await harness.homePage.goto();
    await harness.homePage.openFirstProduct();
    await expect(harness.productPage.title).toBeVisible();
    await expect(harness.productPage.addToCart).toBeVisible();
    await expect(harness.page).toHaveURL(/product/);
  });
});

describe('UI Regression @Regression', function () {
  const harness = new TestHarness();

  beforeEach(async function () {
    await harness.launchBrowser();
    await harness.launchApi();
  });

  afterEach(async function () {
    await harness.dispose();
  });

  it('TC-UI-R01 | Login fails with invalid password', async function () {
    await harness.loginPage.goto();
    await harness.loginPage.login('invalid.user@toolshop.test', 'WrongPass!123');
    await expect(harness.page).toHaveURL(/login/);
    await expect(harness.loginPage.error).toBeVisible();
  });

  it('TC-UI-R02 | End-to-end purchase with COD and invoice confirmation', async function () {
    const user = buildUser();
    await harness.uiFlows.registerAndLogin(user, { viaApi: true });
    await harness.uiFlows.addFirstProductToCart(2);
    await harness.uiFlows.completeCashOnDeliveryCheckout();
    await harness.accountPage.openMyInvoices();
    await expect(harness.page.getByText(/INV-|invoice/i).first()).toBeVisible({ timeout: 30_000 });
  });

  it('TC-UI-R03 | Search returns matching products', async function () {
    await harness.homePage.goto();
    await harness.homePage.search('Pliers');
    await expect(harness.page.getByText(/pliers/i).first()).toBeVisible();
  });

  it('TC-UI-R04 | Profile displays registered user details', async function () {
    const user = buildUser({ first_name: 'Profile', last_name: 'Check' });
    await harness.uiFlows.registerAndLogin(user);
    await harness.accountPage.openProfileTab();
    await expect(harness.page.locator('[data-test="first-name"]')).toHaveValue('Profile');
    await expect(harness.page.locator('[data-test="last-name"]')).toHaveValue('Check');
    await expect(harness.page.locator('[data-test="email"]')).toHaveValue(user.email);
  });
});

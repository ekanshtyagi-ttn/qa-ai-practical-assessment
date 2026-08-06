const { expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');
const { findInStockProductId } = require('./productHelper');
const { seedUiSessionFromApi } = require('./authHelper');

/**
 * Shared UI flows for Toolshop assessment scenarios.
 */
class UiFlows {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {object} pages
   * @param {import('../api/ProductApi').ProductApi} [productApi]
   * @param {import('../api/AuthApi').AuthApi} [authApi]
   */
  constructor(page, pages, productApi, authApi) {
    this.page = page;
    this.homePage = pages.homePage;
    this.loginPage = pages.loginPage;
    this.registerPage = pages.registerPage;
    this.cartPage = pages.cartPage;
    this.checkoutPage = pages.checkoutPage;
    this.accountPage = pages.accountPage;
    this.productPage = new ProductPage(page);
    this.productApi = productApi;
    this.authApi = authApi;
  }

  async registerAndLogin(user, options = {}) {
    const { viaApi = false } = options;
    if (viaApi && this.authApi) {
      await seedUiSessionFromApi(this.page, this.authApi, user);
      await this.page.goto('/account');
      await expect(this.page.getByRole('heading', { name: /my account/i })).toBeVisible({
        timeout: 30_000,
      });
      return;
    }
    const uiUser = {
      firstName: user.first_name,
      lastName: user.last_name,
      dob: user.dob,
      postalCode: user.address.postal_code,
      houseNumber: user.address.house_number,
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      country: 'Netherlands (the)',
      phone: user.phone,
      email: user.email,
      password: user.password,
    };
    await this.homePage.goto();
    await this.homePage.openSignIn();
    await this.loginPage.goToRegister();
    await this.registerPage.register(uiUser);
    await this.page.waitForLoadState('networkidle');
    if (this.page.url().includes('/auth/login')) {
      await this.loginPage.login(uiUser.email, uiUser.password);
    }
    await this.page.waitForURL((url) => !url.pathname.includes('/auth/'), { timeout: 60_000 });
    await expect(this.page.getByRole('heading', { name: /my account/i })).toBeVisible({
      timeout: 30_000,
    });
  }

  async login(email, password) {
    await this.homePage.goto();
    await this.homePage.openSignIn();
    await this.loginPage.login(email, password);
    await this.page.waitForURL(/\/(account|checkout|$)/, { timeout: 45_000 });
  }

  async addFirstProductToCart(quantity = 1) {
    if (this.productApi) {
      const productId = await findInStockProductId(this.productApi);
      if (productId) {
        await this.page.goto(`/product/${productId}`);
        await this.productPage.addToCart.waitFor({ state: 'visible', timeout: 15_000 });
        if (quantity > 1) await this.productPage.setQuantity(quantity);
        await this.productPage.addProductToCart();
        return;
      }
    }

    await this.homePage.goto();
    const products = this.page.locator('[data-test="product-name"]');
    const total = await products.count();
    for (let i = 0; i < total; i++) {
      await products.nth(i).click();
      await this.productPage.addToCart.waitFor({ state: 'visible', timeout: 15_000 });
      if (await this.productPage.addToCart.isEnabled()) {
        if (quantity > 1) {
          await this.productPage.setQuantity(quantity);
        }
        await this.productPage.addProductToCart();
        return;
      }
      await this.page.goBack();
      await this.homePage.goto();
    }
    throw new Error('No in-stock product found on catalog for UI checkout flow');
  }

  async completeCashOnDeliveryCheckout() {
    await this.cartPage.open();
    await this.cartPage.proceedToCheckout();
    await this.checkoutPage.proceedCartStep();
    await this.checkoutPage.proceedSignInStep();
    await this.checkoutPage.completeBillingStep();
    await this.checkoutPage.selectCashOnDelivery();
    await this.checkoutPage.confirmInvoiceTwice();
  }
}

module.exports = { UiFlows };

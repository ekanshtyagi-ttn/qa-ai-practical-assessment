const path = require('path');
const { chromium, request } = require('playwright');
const { expect } = require('@playwright/test');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { AuthApi } = require('../api/AuthApi');
const { ProductApi } = require('../api/ProductApi');
const { CartApi } = require('../api/CartApi');
const { InvoiceApi } = require('../api/InvoiceApi');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { AccountPage } = require('../pages/AccountPage');
const { ProductPage } = require('../pages/ProductPage');
const { UiFlows } = require('../utils/uiFlows');
const { UI_BASE_URL, API_BASE_URL } = require('../utils/constants');

function isHeaded() {
  return ['1', 'true'].includes((process.env.HEADED || '').toLowerCase());
}

class TestHarness {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.apiContext = null;
    this.homePage = null;
    this.loginPage = null;
    this.registerPage = null;
    this.cartPage = null;
    this.checkoutPage = null;
    this.accountPage = null;
    this.productPage = null;
    this.uiFlows = null;
    this.authApi = null;
    this.productApi = null;
    this.cartApi = null;
    this.invoiceApi = null;
  }

  async launchBrowser() {
    this.browser = await chromium.launch({ headless: !isHeaded() });
    this.context = await this.browser.newContext({
      baseURL: UI_BASE_URL,
      extraHTTPHeaders: { Accept: 'application/json' },
    });
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(20_000);
    this.page.setDefaultNavigationTimeout(45_000);
    this._initPageObjects();
  }

  async launchApi() {
    this.apiContext = await request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: { Accept: 'application/json' },
    });
    this.authApi = new AuthApi(this.apiContext, API_BASE_URL);
    this.productApi = new ProductApi(this.apiContext, API_BASE_URL);
    this.cartApi = new CartApi(this.apiContext, API_BASE_URL);
    this.invoiceApi = new InvoiceApi(this.apiContext, API_BASE_URL);
    if (this.page) {
      this._initUiFlows();
    }
  }

  _initPageObjects() {
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.accountPage = new AccountPage(this.page);
    this.productPage = new ProductPage(this.page);
    if (this.authApi) {
      this._initUiFlows();
    }
  }

  _initUiFlows() {
    this.uiFlows = new UiFlows(
      this.page,
      {
        homePage: this.homePage,
        loginPage: this.loginPage,
        registerPage: this.registerPage,
        cartPage: this.cartPage,
        checkoutPage: this.checkoutPage,
        accountPage: this.accountPage,
      },
      this.productApi,
      this.authApi
    );
  }

  async closeBrowser() {
    if (this.context) {
      await this.context.close();
      this.context = null;
      this.page = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async closeApi() {
    if (this.apiContext) {
      await this.apiContext.dispose();
      this.apiContext = null;
    }
  }

  async dispose() {
    await this.closeBrowser();
    await this.closeApi();
  }
}

module.exports = { TestHarness, expect };

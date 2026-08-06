class AccountPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.navUserMenu = page.locator('[data-test="nav-user-menu"]');
    this.myAccount = page.locator('[data-test="nav-my-account"], a[href*="account"]');
    this.myInvoices = page.locator('[data-test="nav-my-invoices"], a[href*="invoices"]');
    this.profileEmail = page.locator('[data-test="email"], input[type="email"]');
    this.invoiceRows = page.locator('table tbody tr, [data-test="invoice-number"]');
  }

  async openMyAccount() {
    if (await this.page.getByRole('heading', { name: /my account/i }).isVisible().catch(() => false)) {
      return;
    }
    const userButton = this.page.locator('[data-test="nav-user-menu"], [data-test="nav-menu"]').first();
    if (await userButton.isVisible().catch(() => false)) {
      await userButton.click();
    }
    if (await this.myAccount.first().isVisible().catch(() => false)) {
      await this.myAccount.first().click();
    }
  }

  async openProfileTab() {
    await this.page.locator('[data-test="nav-profile"]').click();
  }

  async openMyInvoices() {
    await this.page.goto('/account');
    await this.page.locator('[data-test="nav-invoices"]').click();
  }
}

module.exports = { AccountPage };

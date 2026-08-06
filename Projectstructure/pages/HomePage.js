class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.navSignIn = page.getByRole('link', { name: /sign in/i });
    this.navHome = page.getByRole('link', { name: /^home$/i }).first();
    this.navCategories = page.getByRole('button', { name: /categories/i });
    this.searchBox = page.getByPlaceholder(/search/i);
    this.productCards = page.locator('a.card, .card a, [data-test="product-name"]');
    this.productNames = page.locator('[data-test="product-name"]');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openSignIn() {
    await this.navSignIn.click();
  }

  async openFirstProduct() {
    await this.productNames.first().waitFor({ state: 'visible' });
    await this.productNames.first().click();
  }

  async search(term) {
    await this.searchBox.fill(term);
    await this.searchBox.press('Enter');
  }
}

module.exports = { HomePage };

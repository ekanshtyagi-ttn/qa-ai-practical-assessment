class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.navCart = page.locator('[data-test="nav-cart"]');
    this.cartRows = page.locator('[data-test="cart-quantity"], table tbody tr, .product-title');
    this.proceedBtn = page.locator('[data-test="proceed-1"], [data-test="proceed-to-checkout"]');
    this.quantityInputs = page.locator('[data-test="product-quantity"]');
  }

  async open() {
    await this.navCart.click();
    await this.page.waitForURL(/\/checkout|\/cart/);
  }

  async proceedToCheckout() {
    await this.proceedBtn.first().click();
  }
}

module.exports = { CartPage };

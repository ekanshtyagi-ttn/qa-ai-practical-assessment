class ProductPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="product-name"]');
    this.price = page.locator('[data-test="unit-price"]');
    this.quantity = page.locator('[data-test="quantity"]');
    this.increaseQty = page.locator('[data-test="increase-quantity"]');
    this.decreaseQty = page.locator('[data-test="decrease-quantity"]');
    this.addToCart = page.locator('[data-test="add-to-cart"]');
    this.toast = page.locator('#toast-container, .toast-success, .alert-success');
  }

  async setQuantity(qty) {
    const enabled = await this.increaseQty.isEnabled().catch(() => false);
    if (!enabled) return;
    const target = Number(qty);
    let current = Number(await this.quantity.inputValue().catch(() => 1));
    while (current < target) {
      await this.increaseQty.click();
      current += 1;
    }
  }

  async addProductToCart() {
    await this.addToCart.click();
  }
}

module.exports = { ProductPage };

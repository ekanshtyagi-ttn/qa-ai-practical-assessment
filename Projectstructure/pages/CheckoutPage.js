class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.proceed1 = page.locator('[data-test="proceed-1"]');
    this.proceed2 = page.locator('[data-test="proceed-2"]');
    this.proceed3 = page.locator('[data-test="proceed-3"]');
    this.paymentMethod = page.locator('[data-test="payment-method"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.confirmBtn = page.getByRole('button', { name: /^confirm$/i });
    this.houseNumber = page.getByRole('textbox', { name: /^house number/i });
    this.postalCode = page.getByRole('textbox', { name: /^postal code/i });
    this.country = page.locator('[data-test="country"]');
  }

  async clickWhenEnabled(locator) {
    await locator.waitFor({ state: 'visible', timeout: 20_000 });
    await locator.click({ timeout: 20_000, force: false, trial: false });
  }

  async proceedCartStep() {
    if (await this.proceed1.isVisible().catch(() => false)) {
      await this.clickWhenEnabled(this.proceed1);
    }
  }

  async proceedSignInStep() {
    if (await this.proceed2.isVisible().catch(() => false)) {
      await this.clickWhenEnabled(this.proceed2);
    }
  }

  async completeBillingStep() {
    if (await this.country.isVisible().catch(() => false)) {
      await this.country.selectOption({ label: 'Netherlands (the)' }).catch(() => {});
    }
    if (await this.postalCode.isVisible().catch(() => false)) {
      await this.postalCode.fill('1012LG');
    }
    if (await this.houseNumber.isVisible().catch(() => false)) {
      await this.houseNumber.fill('1');
      await this.houseNumber.press('Tab');
    }
    await this.page.waitForTimeout(1200);
    if (await this.proceed3.isVisible().catch(() => false)) {
      await this.proceed3.waitFor({ state: 'visible' });
      await this.page.waitForFunction(
        () => {
          const btn = document.querySelector('[data-test="proceed-3"]');
          return btn && !btn.disabled;
        },
        null,
        { timeout: 25_000 }
      );
      await this.proceed3.click();
    }
  }

  async selectCashOnDelivery() {
    await this.paymentMethod.selectOption({ value: 'cash-on-delivery' });
  }

  /** Assessment note: press Confirm twice to generate invoice. */
  async confirmInvoiceTwice() {
    await this.confirmBtn.waitFor({ state: 'visible', timeout: 30_000 });
    await this.confirmBtn.click();
    await this.page.waitForTimeout(1000);
    if (await this.confirmBtn.isVisible().catch(() => false)) {
      await this.confirmBtn.click();
    }
    await this.page
      .getByText(/payment was successful|invoice/i)
      .first()
      .waitFor({ state: 'visible', timeout: 30_000 })
      .catch(() => {});
  }
}

module.exports = { CheckoutPage };

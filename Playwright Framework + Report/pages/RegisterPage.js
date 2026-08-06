class RegisterPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dob = page.locator('[data-test="dob"]');
    this.country = page.locator('[data-test="country"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.houseNumber = page.locator('[data-test="house_number"]');
    this.street = page.locator('[data-test="street"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.phone = page.locator('[data-test="phone"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.submit = page.locator('[data-test="register-submit"]');
    this.registerError = page.locator('[data-test="register-error"], .alert-danger');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  /**
   * @param {{firstName:string,lastName:string,dob:string,postalCode:string,houseNumber:string,street?:string,city?:string,state?:string,country:string,phone:string,email:string,password:string}} data
   */
  async register(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.dob.fill(data.dob);
    await this.country.selectOption({ label: data.country });
    await this.postalCode.fill(data.postalCode);
    await this.houseNumber.fill(data.houseNumber);
    // Allow address lookup to populate street/city/state when available
    await this.page.waitForTimeout(800);
    if (data.street && (await this.street.inputValue()) === '') {
      await this.street.fill(data.street);
    }
    if (data.city && (await this.city.inputValue()) === '') {
      await this.city.fill(data.city);
    }
    if (data.state && (await this.state.inputValue()) === '') {
      await this.state.fill(data.state);
    }
    await this.phone.fill(data.phone);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.submit.click();
  }
}

module.exports = { RegisterPage };

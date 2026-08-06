class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-submit"]');
    this.registerLink = page.locator('[data-test="register-link"]');
    this.error = page.locator('[data-test="login-error"]');
    this.navMenu = page.locator('[data-test="nav-menu"], [data-test="nav-user-menu"]');
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async goToRegister() {
    await this.registerLink.click();
  }
}

module.exports = { LoginPage };

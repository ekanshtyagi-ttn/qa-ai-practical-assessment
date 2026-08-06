/**
 * Seed UI session using API register/login (faster and more reliable than UI registration).
 * @param {import('@playwright/test').Page} page
 * @param {import('../api/AuthApi').AuthApi} authApi
 * @param {object} user
 */
async function seedUiSessionFromApi(page, authApi, user) {
  const register = await authApi.register(user);
  if (register.status() !== 201) {
    const body = await register.text();
    throw new Error(`API registration failed: ${register.status()} ${body}`);
  }
  const login = await authApi.login(user.email, user.password);
  if (login.status() !== 200) {
    throw new Error(`API login failed: ${login.status()}`);
  }
  const { access_token: token } = await login.json();
  await page.goto('/');
  await page.evaluate((accessToken) => {
    localStorage.setItem('auth-token', accessToken);
  }, token);
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
}

module.exports = { seedUiSessionFromApi };

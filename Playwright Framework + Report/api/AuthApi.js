class AuthApi {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} baseURL
   */
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async register(user) {
    const response = await this.request.post(`${this.baseURL}/users/register`, {
      data: user,
    });
    return response;
  }

  async login(email, password) {
    const response = await this.request.post(`${this.baseURL}/users/login`, {
      data: { email, password },
    });
    return response;
  }

  async me(token) {
    return this.request.get(`${this.baseURL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async loginInvalid(email, password) {
    return this.login(email, password);
  }
}

module.exports = { AuthApi };

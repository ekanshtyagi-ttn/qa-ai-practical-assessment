class ProductApi {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} baseURL
   */
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async list(page = 1) {
    return this.request.get(`${this.baseURL}/products`, {
      params: { page: String(page) },
    });
  }

  async getById(productId) {
    return this.request.get(`${this.baseURL}/products/${productId}`);
  }

  async search(query) {
    return this.request.get(`${this.baseURL}/products/search`, {
      params: { q: query },
    });
  }
}

module.exports = { ProductApi };

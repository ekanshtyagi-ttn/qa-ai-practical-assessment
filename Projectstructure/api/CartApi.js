class CartApi {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} baseURL
   */
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async create() {
    return this.request.post(`${this.baseURL}/carts`, {
      data: {},
    });
  }

  async get(cartId) {
    return this.request.get(`${this.baseURL}/carts/${cartId}`);
  }

  async addProduct(cartId, productId, quantity = 1) {
    return this.request.post(`${this.baseURL}/carts/${cartId}`, {
      data: { product_id: productId, quantity },
    });
  }

  async updateQuantity(cartId, productId, quantity) {
    return this.request.put(`${this.baseURL}/carts/${cartId}/product/quantity`, {
      data: { product_id: productId, quantity },
    });
  }
}

module.exports = { CartApi };

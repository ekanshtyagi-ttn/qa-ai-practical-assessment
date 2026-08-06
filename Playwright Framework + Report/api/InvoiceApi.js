class InvoiceApi {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} baseURL
   */
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  async create(token, payload) {
    return this.request.post(`${this.baseURL}/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async list(token) {
    return this.request.get(`${this.baseURL}/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getById(token, invoiceId) {
    return this.request.get(`${this.baseURL}/invoices/${invoiceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

module.exports = { InvoiceApi };

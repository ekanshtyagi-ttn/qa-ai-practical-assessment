module.exports = {
  UI_BASE_URL: process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com',
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com',
  PAYMENT_METHOD_COD: 'cash-on-delivery',
  /**
   * Toolshop address validation accepts this known sandbox billing payload
   * (see assessment guide example). Real city/country combos are often rejected.
   */
  BILLING: {
    billing_street: 'Zoey Shore',
    billing_city: 'Hesselbury',
    billing_state: 'Florida',
    billing_country: 'TG',
    billing_postal_code: '1234AA',
    payment_method: 'cash-on-delivery',
    payment_details: {},
  },
};

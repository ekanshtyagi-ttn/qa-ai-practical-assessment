/**
 * @param {import('../api/ProductApi').ProductApi} productApi
 */
async function findInStockProductId(productApi) {
  for (let page = 1; page <= 10; page += 1) {
    const response = await productApi.list(page);
    const body = await response.json();
    const match = (body.data || []).find((product) => product.in_stock);
    if (match) return match.id;
    if (!body.next_page_url || page >= body.last_page) break;
  }
  return null;
}

module.exports = { findInStockProductId };

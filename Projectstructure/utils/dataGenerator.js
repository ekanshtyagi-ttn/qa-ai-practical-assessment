/**
 * Lightweight test-data helpers (no extra faker dependency).
 * Passwords must include upper, lower, number, symbol and avoid leaked-password lists.
 */
function uniqueSuffix() {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

function buildUser(overrides = {}) {
  const suffix = uniqueSuffix();
  return {
    first_name: 'QA',
    last_name: 'Auto',
    dob: '1988-05-15',
    address: {
      street: 'Damrak',
      house_number: '1',
      city: 'Amsterdam',
      state: 'Noord-Holland',
      country: 'NL',
      postal_code: '1012LG',
    },
    phone: '0612345678',
    email: `qa.auto.${suffix}@toolshop.test`,
    password: `QaTool#${suffix}!`,
    ...overrides,
  };
}

function buildUiRegistration(user = buildUser()) {
  return {
    firstName: user.first_name,
    lastName: user.last_name,
    dob: user.dob,
    postalCode: user.address.postal_code,
    houseNumber: user.address.house_number,
    street: user.address.street,
    city: user.address.city,
    state: user.address.state,
    country: 'Netherlands (the)',
    phone: user.phone,
    email: user.email,
    password: user.password,
  };
}

module.exports = {
  uniqueSuffix,
  buildUser,
  buildUiRegistration,
};

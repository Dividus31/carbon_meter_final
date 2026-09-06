// Thin fetch wrapper around the Carbon-Meter customer-area API.
// The login session lives in an HttpOnly cookie set by the server, so every
// request is made with credentials: 'include' and no token handling happens
// on the client at all.
var CarbonMeterAuth = (function () {
  var BASE = (window.CARBON_METER_CONFIG && window.CARBON_METER_CONFIG.API_BASE_URL) || '/api';

  function request(path, options) {
    var opts = Object.assign(
      {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
      options || {}
    );

    return fetch(BASE + path, opts).then(function (res) {
      return res
        .json()
        .catch(function () {
          return null;
        })
        .then(function (data) {
          if (!res.ok) {
            var message = (data && data.error) || 'Something went wrong. Please try again.';
            var err = new Error(message);
            err.status = res.status;
            throw err;
          }
          return data;
        });
    });
  }

  return {
    register: function (name, email, password) {
      return request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
    },
    login: function (email, password) {
      return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
      });
    },
    logout: function () {
      return request('/auth/logout', { method: 'POST' });
    },
    me: function () {
      return request('/auth/me', { method: 'GET' });
    },
    listFavorites: function () {
      return request('/customer/favorites', { method: 'GET' });
    },
    addFavorite: function (countryCode, countryName) {
      return request('/customer/favorites', {
        method: 'POST',
        body: JSON.stringify({ countryCode: countryCode, countryName: countryName }),
      });
    },
    removeFavorite: function (id) {
      return request('/customer/favorites/' + id, { method: 'DELETE' });
    },
    listCustomers: function () {
      return request('/admin/customers', { method: 'GET' });
    },
  };
})();

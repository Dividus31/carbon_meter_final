// Central place for frontend runtime config.
// In local dev the static site and the API run on different ports, so we
// point at the API explicitly - but using the SAME hostname the page itself
// was loaded from (not a hardcoded 'localhost'). This matters: browsers treat
// "localhost" and "127.0.0.1" as different sites, and the login cookie is
// SameSite=Lax, so if the page is on 127.0.0.1 but the API call went to
// "localhost", the cookie would silently be dropped on every request after
// login (looks like "logs in for a second, then bounces back to login").
// Cookies aren't port-scoped, so differing ports on the same hostname are
// fine. In production we assume the API is reverse proxied under /api on the
// same origin as the static site.
window.CARBON_METER_CONFIG = (function () {
  var isLocal = ['localhost', '127.0.0.1'].indexOf(window.location.hostname) !== -1;
  return {
    API_BASE_URL: isLocal ? 'http://' + window.location.hostname + ':3000/api' : '/api',
  };
})();

// Progressive enhancement for index.html: if the visitor already has a valid
// login session, swap the "Customer Login" nav links for a direct link into
// the customer area instead of making them log in again.
document.addEventListener('DOMContentLoaded', function () {
  if (typeof CarbonMeterAuth === 'undefined') return;

  CarbonMeterAuth.me()
    .then(function () {
      document.querySelectorAll('[data-auth-link="header"]').forEach(function (link) {
        link.href = 'customer-area.html';
        link.textContent = 'My Account';
      });

      document.querySelectorAll('[data-auth-link="sidebar"]').forEach(function (link) {
        link.href = 'customer-area.html';
        link.innerHTML = '<i class="fas fa-user me-2"></i>My Account';
      });
    })
    .catch(function () {
      // Not logged in (or API unreachable): leave the default
      // "Customer Login" links pointing at login.html.
    });
});

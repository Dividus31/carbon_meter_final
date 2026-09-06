document.addEventListener('DOMContentLoaded', function () {
  var deniedBox = document.getElementById('accessDenied');
  var tableWrap = document.getElementById('customersTableWrap');
  var tbody = document.getElementById('customersTableBody');
  var countEl = document.getElementById('customerCount');

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return iso;
    }
  }

  CarbonMeterAuth.me()
    .then(function () {
      return CarbonMeterAuth.listCustomers();
    })
    .then(function (data) {
      var customers = data.customers || [];
      countEl.textContent = customers.length;

      customers.forEach(function (c) {
        var tr = document.createElement('tr');

        var nameTd = document.createElement('td');
        nameTd.textContent = c.name;

        var emailTd = document.createElement('td');
        emailTd.textContent = c.email;

        var roleTd = document.createElement('td');
        var badge = document.createElement('span');
        badge.className = 'badge ' + (c.role === 'admin' ? 'bg-success' : 'bg-secondary');
        badge.textContent = c.role;
        roleTd.appendChild(badge);

        var joinedTd = document.createElement('td');
        joinedTd.textContent = formatDate(c.created_at);

        tr.appendChild(nameTd);
        tr.appendChild(emailTd);
        tr.appendChild(roleTd);
        tr.appendChild(joinedTd);
        tbody.appendChild(tr);
      });

      tableWrap.classList.remove('d-none');
    })
    .catch(function (err) {
      if (err.status === 401) {
        window.location.href = 'login.html';
        return;
      }
      deniedBox.textContent =
        err.status === 403 ? "You don't have admin access." : err.message;
      deniedBox.classList.remove('d-none');
    });
});

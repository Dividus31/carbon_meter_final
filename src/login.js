document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  var alertBox = document.getElementById('loginAlert');
  var submitBtn = document.getElementById('loginSubmit');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alertBox.classList.add('d-none');
    submitBtn.disabled = true;

    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;

    CarbonMeterAuth.login(email, password)
      .then(function () {
        window.location.href = 'customer-area.html';
      })
      .catch(function (err) {
        alertBox.textContent = err.message;
        alertBox.classList.remove('d-none');
        submitBtn.disabled = false;
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('registerForm');
  var alertBox = document.getElementById('registerAlert');
  var submitBtn = document.getElementById('registerSubmit');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alertBox.classList.add('d-none');

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alertBox.textContent = 'Passwords do not match.';
      alertBox.classList.remove('d-none');
      return;
    }

    submitBtn.disabled = true;

    CarbonMeterAuth.register(name, email, password)
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

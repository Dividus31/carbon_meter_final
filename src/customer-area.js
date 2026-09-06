document.addEventListener('DOMContentLoaded', function () {
  var welcomeEl = document.getElementById('welcomeName');
  var emailEl = document.getElementById('profileEmail');
  var memberSinceEl = document.getElementById('profileMemberSince');
  var logoutBtn = document.getElementById('logoutBtn');
  var adminLink = document.getElementById('adminLink');
  var favoritesList = document.getElementById('favoritesList');
  var favoritesEmpty = document.getElementById('favoritesEmpty');
  var addForm = document.getElementById('addFavoriteForm');
  var countrySelect = document.getElementById('countrySelect');
  var addAlert = document.getElementById('addFavoriteAlert');

  var trackedCodes = [];

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

  function populateCountrySelect() {
    countrySelect.innerHTML = '';
    var available = CARBON_METER_COUNTRIES.filter(function (c) {
      return trackedCodes.indexOf(c.code) === -1;
    });

    if (available.length === 0) {
      var opt = document.createElement('option');
      opt.textContent = 'All countries already tracked';
      opt.disabled = true;
      countrySelect.appendChild(opt);
      addForm.querySelector('button[type="submit"]').disabled = true;
      return;
    }

    addForm.querySelector('button[type="submit"]').disabled = false;
    available.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = c.name + ' (' + c.code + ')';
      countrySelect.appendChild(opt);
    });
  }

  function renderFavorites(favorites) {
    trackedCodes = favorites.map(function (f) {
      return f.country_code;
    });
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
      favoritesEmpty.classList.remove('d-none');
    } else {
      favoritesEmpty.classList.add('d-none');
      favorites.forEach(function (fav) {
        var li = document.createElement('li');
        li.className =
          'list-group-item d-flex justify-content-between align-items-center favorite-item';
        li.innerHTML =
          '<span><i class="fas fa-leaf me-2"></i>' +
          fav.country_name +
          ' <span class="text-muted">(' +
          fav.country_code +
          ')</span></span>';

        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'btn btn-sm btn-outline-danger';
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.setAttribute('aria-label', 'Remove ' + fav.country_name);
        removeBtn.addEventListener('click', function () {
          removeBtn.disabled = true;
          CarbonMeterAuth.removeFavorite(fav.id)
            .then(loadFavorites)
            .catch(function (err) {
              alert(err.message);
              removeBtn.disabled = false;
            });
        });

        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
      });
    }

    populateCountrySelect();
  }

  function loadFavorites() {
    return CarbonMeterAuth.listFavorites().then(function (data) {
      renderFavorites(data.favorites || []);
    });
  }

  function loadProfile() {
    return CarbonMeterAuth.me().then(function (data) {
      var user = data.user;
      welcomeEl.textContent = user.name;
      emailEl.textContent = user.email;
      memberSinceEl.textContent = formatDate(user.createdAt);
      if (user.role === 'admin') {
        adminLink.classList.remove('d-none');
      }
    });
  }

  Promise.all([loadProfile(), loadFavorites()]).catch(function () {
    // Not authenticated (or session expired) - send back to login.
    window.location.href = 'login.html';
  });

  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addAlert.classList.add('d-none');

    var selected = countrySelect.options[countrySelect.selectedIndex];
    if (!selected || !selected.value) return;

    var countryCode = selected.value;
    var country = CARBON_METER_COUNTRIES.find(function (c) {
      return c.code === countryCode;
    });

    CarbonMeterAuth.addFavorite(countryCode, country.name)
      .then(loadFavorites)
      .catch(function (err) {
        addAlert.textContent = err.message;
        addAlert.classList.remove('d-none');
      });
  });

  logoutBtn.addEventListener('click', function () {
    logoutBtn.disabled = true;
    CarbonMeterAuth.logout().finally(function () {
      window.location.href = 'login.html';
    });
  });
});

'use strict';

(function () {
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';
  var userName = document.querySelector('#username');
  var userPhone = document.querySelector('#userphone');
  var form = document.querySelector('#feedback-form');
  var inputs = document.querySelectorAll('form input');

  if (form) {
    form.addEventListener('submit', function (evt) {
      inputs.forEach(function (elem) {
        if (!elem.value) {
          evt.preventDefault();
          elem.classList.remove('form__input--error');
          elem.classList.add('form__input--error');
        } else {
          if (isStorageSupport) {
            localStorage.setItem('user', userName.value);
            localStorage.setItem('phone', userPhone.value);
          }
        }
      });
    });
  }

  // validateNumber(userPhone);
  try {
    storageName = localStorage.getItem('user');
    storagePhone = localStorage.getItem('phone');
  } catch (err) {
    isStorageSupport = false;
  }

  if (inputs) {
    inputs.forEach(function (elem) {
      elem.removeAttribute('required');
    });
  }

  document.addEventListener('click', function () {
    if (inputs) {
      inputs.forEach(function (elem) {
        if (elem.classList.contains('form__input--error')) {
          elem.classList.remove('form__input--error');
        }
      });
    }
  });

  window.localstorage = {
    storageName: storageName,
    storagePhone: storagePhone,
    isStorageSupport: isStorageSupport,
    form: form
  };
})();

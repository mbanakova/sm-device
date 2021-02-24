'use strict';

(function () {
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';
  var userName = document.querySelector('#username');
  var userPhone = document.querySelector('#userphone');
  var form = document.querySelector('#feedback-form');
  var inputs = document.querySelectorAll('form input');
  var validLength = 18;

  if (form) {
    form.addEventListener('submit', function (evt) {
      if (!userName.value || !userPhone.value || (userPhone.value.length !== validLength)) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('user', userName.value);
          localStorage.setItem('phone', userPhone.value);
        }
      }
    });
  }

  try {
    storageName = localStorage.getItem('user');
    storagePhone = localStorage.getItem('phone');
  } catch (err) {
    isStorageSupport = false;
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

  window.form = {
    storageName: storageName,
    storagePhone: storagePhone,
    isStorageSupport: isStorageSupport,
    form: form,
    validLength: validLength
  };
})();

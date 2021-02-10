'use strict';

(function () {
  // запись в LocalStorage
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';
  var userName = document.querySelector('#username');
  var userPhone = document.querySelector('#userphone');
  var form = document.querySelector('#feedback-form');
  var inputs = form.querySelectorAll('form input');

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
    inputs.forEach(function (elem) {
      if (elem.classList.contains('form__input--error')) {
        elem.classList.remove('form__input--error');
      }
    });
  });

  // ------------------------ Модальное окно
  var orderCall = document.querySelector('.header__button');
  var modal = document.querySelector('.modal');
  var closeModalBtn = document.querySelector('#close');
  var overlay = document.querySelector('.modal__overlay');
  var modalForm = document.querySelector('#modal-form');
  var user = modalForm.querySelector('#user-name');
  var phone = modalForm.querySelector('#user-phone');
  var modalInputs = modalForm.querySelectorAll('input');

  function openModal() {
    modal.classList.add('modal--open');
    window.onscroll = function () {
      window.scrollTo(0, 0);
    };
  }

  function closeModal() {
    modal.classList.remove('modal--open');
    window.onscroll = function () {};
  }

  if (orderCall) {
    orderCall.addEventListener('click', function () {
      openModal();
      if (storageName && storagePhone) {
        if (user || phone) {
          user.value = storageName;
          phone.value = storagePhone;
        }
      } else {
        user.focus();
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
      closeModal();
    });
  }

  if (modal) {
    // закрыть через Esc
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        if (modal.classList.contains('modal--open')) {
          evt.preventDefault();
          closeModal();
        }
      }
    });
    // Закрыть по клику снаружи
    overlay.addEventListener('click', function (elem) {
      if (elem.target === overlay && elem.target !== form) {
        modal.classList.remove('modal--open');
        closeModal();
      }
    });
  }

  if (modalInputs) {
    modalInputs.forEach(function (elem) {
      elem.removeAttribute('required');
    });
  }

  modalForm.addEventListener('submit', function (evt) {
    modalInputs.forEach(function (elem) {
      if (!elem.value) {
        evt.preventDefault();
        elem.classList.remove('form__input--error');
        elem.classList.add('form__input--error');
      } else {
        if (isStorageSupport) {
          localStorage.setItem('user', user.value);
          localStorage.setItem('phone', phone.value);
        }
      }
    });
  });

  // -------------------------------- Маска телефона
  var maskedPhones = document.querySelectorAll('[data-mask]');
  if (maskedPhones) {
    maskedPhones.forEach(function (elem) {
      elem.addEventListener('input', showMask);
    });
  }

  function showMask() {
    // eslint-disable-next-line no-invalid-this
    var input = this;
    var mask = input.dataset.mask;
    var value = input.value;
    var literalPattern = /[0\*]/;
    var numberPattern = /[0-9]/;
    var newValue = '';

    try {
      var maskLength = mask.length;
      var valueIndex = 0;
      var maskIndex = 0;

      for (; maskIndex < maskLength;) {
        if (maskIndex >= value.length) {
          break;
        }

        if (mask[maskIndex] === '0' && value[valueIndex].match(numberPattern) === null) {
          break;
        }

        // Found a literal
        while (mask[maskIndex].match(literalPattern) === null) {
          if (value[valueIndex] === mask[maskIndex]) {
            break;
          }

          newValue += mask[maskIndex++];
        }

        newValue += value[valueIndex++];
        maskIndex++;
      }

      input.value = newValue;
    } catch (event) {
      maskedPhones.removeEventListener();
      input.classList.remove('form__input--error');
      input.classList.add('form__input--error');
    }
  }

  // ------------------------ Скролл

  var featuresLink = document.querySelector('.main__link');
  var featuresSection = document.querySelector('#features');
  var feedbackLink = document.querySelector('.main__button');
  var feedbackSection = document.querySelector('#feedback');

  var scroll = function (element) {
    window.scroll({
      left: 0,
      top: element.offsetTop,
      behavior: 'smooth'
    });
  };

  if (featuresLink) {
    featuresLink.addEventListener('click', function () {
      scroll(featuresSection);
    });
  }
  if (feedbackLink) {
    feedbackLink.addEventListener('click', function () {
      scroll(feedbackSection);
    });
  }
})();
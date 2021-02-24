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

'use strict';

(function () {
  var phones = document.querySelectorAll('[data-mask]');

  if (phones) {
    phones.forEach(function (elem) {
      elem.addEventListener('input', function (event) {
        showMask(event);
      });
    });
  }

  function showMask(event) {
    var input = event.target;
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
    } catch (evt) {
      phones.removeEventListener();
      // input.classList.remove('form__input--error');
      // input.classList.add('form__input--error');
    }
  }
})();

'use strict';

(function () {
  var orderCall = document.querySelector('.header__button');
  var modal = document.querySelector('.modal');
  var closeModalBtn = document.querySelector('#close');
  var overlay = document.querySelector('.modal__overlay');
  var modalForm = document.querySelector('#modal-form');
  var user = document.querySelector('#user-name');
  var phone = document.querySelector('#user-phone');

  if (orderCall) {
    orderCall.setAttribute('href', '#');
    orderCall.removeAttribute('target');
  }

  function openModal() {
    if (modal) {
      modal.classList.add('modal--open');
      window.onscroll = function () {
        window.scrollTo(0, 0);
      };
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('modal--open');
      window.onscroll = function () { };
    }
  }

  if (orderCall) {
    orderCall.addEventListener('click', function () {
      openModal();
      if (window.form.storageName && window.form.storagePhone) {
        if (user || phone) {
          user.value = window.form.storageName;
          phone.value = window.form.storagePhone;
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
      if (elem.target === overlay && elem.target !== window.form.form) {
        modal.classList.remove('modal--open');
        closeModal();
      }
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', function (evt) {
      if (!user.value || !phone.value || (phone.value.length !== window.form.validLength)) {
        evt.preventDefault();
      } else {
        if (window.form.isStorageSupport) {
          localStorage.setItem('user', user.value);
          localStorage.setItem('phone', phone.value);
        }
      }
    });
  }
})();

'use strict';

(function () {
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
      if (featuresSection) {
        scroll(featuresSection);
      }
    });
  }
  if (feedbackLink) {
    feedbackLink.addEventListener('click', function () {
      if (feedbackSection) {
        scroll(feedbackSection);
      }
    });
  }
})();

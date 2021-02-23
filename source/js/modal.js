'use strict';

(function () {
  var orderCall = document.querySelector('.header__button');
  var modal = document.querySelector('.modal');
  var closeModalBtn = document.querySelector('#close');
  var overlay = document.querySelector('.modal__overlay');
  var modalForm = document.querySelector('#modal-form');
  var user = document.querySelector('#user-name');
  var phone = document.querySelector('#user-phone');
  var modalInputs = document.querySelectorAll('input');

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
      window.onscroll = function () {};
    }
  }

  if (orderCall) {
    orderCall.addEventListener('click', function () {
      openModal();
      if (window.localstorage.storageName && window.localstorage.storagePhone) {
        if (user || phone) {
          user.value = window.localstorage.storageName;
          phone.value = window.localstorage.storagePhone;
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
      if (elem.target === overlay && elem.target !== window.localstorage.form) {
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

  if (modalForm) {
    modalForm.addEventListener('submit', function (evt) {
      modalInputs.forEach(function (elem) {
        if (!elem.value) {
          evt.preventDefault();
          elem.classList.remove('form__input--error');
          elem.classList.add('form__input--error');
        } else {
          if (window.localstorage.isStorageSupport) {
            localStorage.setItem('user', user.value);
            localStorage.setItem('phone', phone.value);
          }
        }
      });
    });
  }
})();

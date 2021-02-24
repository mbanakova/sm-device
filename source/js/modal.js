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

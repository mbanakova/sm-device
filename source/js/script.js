'use strict';

var callBtn = document.querySelector('.header__button');
var modal = document.querySelector('.modal');
var closeModalBtn = document.querySelector('#close');

callBtn.addEventListener('click', function () {
  modal.classList.add('modal--open');
});

closeModalBtn.addEventListener('click', function () {
  modal.classList.toggle('modal--open');
});

// ---------------------------------------------------
var maskedPhones = document.querySelectorAll('[data-mask]');
maskedPhones.forEach(function (elem) {
  elem.addEventListener('input', showMask);
});

function showMask() {
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
  }
}

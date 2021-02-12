'use strict';

(function () {
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

})();

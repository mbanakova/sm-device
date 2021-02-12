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
      scroll(featuresSection);
    });
  }
  if (feedbackLink) {
    feedbackLink.addEventListener('click', function () {
      scroll(feedbackSection);
    });
  }
})();

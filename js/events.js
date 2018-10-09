'use strict';

(function () {

// addToFavorite

  document.querySelectorAll('.card__btn-favorite').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.target.classList.toggle('card__btn-favorite--selected');
    });

  });

  // show or hide dropdown for card

  document.querySelector('.catalog__cards').addEventListener('click', function (e) {
    var target = e.target;
    var card = window.helpers.getTargetParent(e.target, 'catalog__card');

    if (!target.classList.contains('card__btn-favorite') && !target.classList.contains('.card__btn-composition')) {
      card.querySelector('.card__main').classList.toggle('visually-hidden');
    }
  });

  // toggle btn

  document.querySelectorAll('.toggle-btn__input').forEach(function (elem) {
    elem.addEventListener('click', function (e) {

      var elemID = e.target.id;

      var targetBlock = document.querySelector('.' + elemID);

      if (elemID === 'payment__cash') {
        targetBlock.classList.remove('visually-hidden');
        document.querySelector('.payment__card').classList.add('visually-hidden');
      } else if (elemID === 'payment__card') {
        targetBlock.classList.remove('visually-hidden');
        document.querySelector('.payment__cash').classList.add('visually-hidden');
      } else if (elemID === 'deliver__courier') {
        targetBlock.classList.remove('visually-hidden');
        document.querySelector('.deliver__store').classList.add('visually-hidden');
      } else if (elemID === 'deliver__store') {
        targetBlock.classList.remove('visually-hidden');
        document.querySelector('.deliver__courier').classList.add('visually-hidden');
      }
    });
  });

  // check card

  var cardNumberInput = document.querySelector('.payment__input-wrap--card-number .text-input__input');

  function checkCardNumber() {
    var number = document.querySelector('.payment__input-wrap--card-number .text-input__input').value;

    var arr = number.toString().split('').map(function (char, index) {
      var digit = parseInt(char, 10);

      if ((index + number.length) % 2 === 0) {
        var digitX2 = digit * 2;

        return digitX2 > 9 ? digitX2 - 9 : digitX2;
      }

      return digit;
    });

    var isValueWrong = arr.reduce(function (a, b) {
      return a + b;
    }, 0) % 10;

    if (isValueWrong) {
      cardNumberInput.setCustomValidity('Неверный номер карты!!!');
    } else {
      cardNumberInput.setCustomValidity('');
    }
  }

  cardNumberInput.addEventListener('input', checkCardNumber);


})();

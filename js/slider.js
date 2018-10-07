'use strict';

(function () {
  var sliderLine = document.querySelector('.range__fill-line');
  var slideMin = document.querySelector('.range__btn--left');
  var slideMax = document.querySelector('.range__btn--right');
  var sliderWidth = document.querySelector('.range__filter').offsetWidth;
  var btnWidth = document.querySelector('.range__btn').offsetWidth;

  var priceMin = document.querySelector('.range__price--min');
  var priceMax = document.querySelector('.range__price--max');

  var maxPrice = '3000';

  var priceScale = maxPrice / sliderWidth;

  slideMin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var move = slideMin.offsetLeft - shift;

      startCoords = moveEvt.clientX;

      if (move < 0) {
        move = 0;
      }

      if (move > slideMax.offsetLeft) {
        move = slideMax.offsetLeft;
      }

      slideMin.style.left = move + 'px';
      sliderLine.style.left = move + (btnWidth / 2) + 'px';
      priceMin.innerText = Math.round(move * priceScale);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  slideMax.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var move = slideMax.offsetLeft - shift;

      startCoords = moveEvt.clientX;

      if (move > sliderWidth) {
        move = sliderWidth;
      }

      if (move < slideMin.offsetLeft) {
        move = slideMin.offsetLeft;
      }

      slideMax.style.left = move + 'px';
      sliderLine.style.right = sliderWidth - move - (btnWidth / 2) + 'px';
      priceMax.innerHTML = Math.round(move * priceScale);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  priceMin.innerHTML = Math.round(slideMin.offsetLeft * priceScale);
  priceMax.innerHTML = Math.round(slideMax.offsetLeft * priceScale);
})();

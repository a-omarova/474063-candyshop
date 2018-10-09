'use strict';

(function () {

  window.helpers = {
    getRandomElem: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },

    getShuffleArray: function (arr) {
      var newArray = arr.slice();
      for (var i = newArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = t;
      }
      return newArray;
    },

    getRandomLenghtOfArray: function (arr) {
      return arr.slice(0, window.helpers.getRandomNumber(1, arr.length));
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getTargetParent: function (el, className) {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.className && el.className.indexOf(className) > -1) {
          return el;
        }
      }
      return null;
    }

  };

})();

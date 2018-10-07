'use strict';

(function () {
  var CLASSES_FOR_RATING = {
    1: 'stars__rating--one',
    2: 'stars__rating--two',
    3: 'stars__rating--three',
    4: 'stars__rating--four',
    5: 'stars__rating--five'
  };

  var NUMBER_OF_FIRST_LOADED_GOODS = 13;
  var NUMBER_OF_NEXT_LOADED_GOODS = 6;
  var NUMBER_OF_GOODS = 26;
  var clickCounterBtnMore = 0;


  function createCard(good) {
    var classForAmount;
    var textForSugar = good.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
    var contentsArray = good.nutritionFacts.contents;
    var ratingClass = CLASSES_FOR_RATING[good.rating.value];

    if (good.amount >= 1 && good.amount <= 5) {
      classForAmount = 'card--little';
    } else if (good.amount === 0) {
      classForAmount = 'card--soon';
    } else {
      classForAmount = 'card--in-stock';
    }

    return '<article class="catalog__card card' + classForAmount + '">' +
              '<header class="card__header">' +
                '<h3 class="card__title">' + good.name + '</h3>' +
                '<img class="card__img" src="' + good.picture + '" alt="' + good.name + '" width="265" height="264">' +
                '<span class="card__price">' + good.price + '<span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span></span>' +
              '</header>' +
              '<div class="card__main visually-hidden">' +
                '<div class="card__rating">' +
                  '<button class="card__btn-composition" type="button">Состав</button>' +
                  '<div class="card__stars stars">' +
                  '<span class="stars__rating' + ratingClass + '">Рейтинг: ' + good.rating.value + ' звёзд</span>' +
                  '<span class="star__count">(' + good.rating.number + ')</span>' +
                  '</div>' +
                '</div>' +
                '<div class="card__composition card__composition--hidden">' +
                  '<p class="card__characteristic">' + textForSugar + '. 133 ккал</p>' +
                  '<p class="card__composition-list">' + contentsArray.join(', ') + '</p>' +
                '</div>' +
                '<p class="card__btns-wrap">' +
                '<a class="card__btn-favorite" href="#">Добавить в избранное</a>' +
                '<a class="card__btn" href="#">Добавить +1</a>' +
                '</p>' +
              '</div>' +
            '</article>';
  }

  window.createListOfGoodsInDOM = function (list, numberOfItems, containerClassName, func) {
    document.querySelector('.catalog__load').classList.add('visually-hidden');

    for (var i = 0; i < numberOfItems; i++) {
      document.querySelector(containerClassName).innerHTML += func(list[i]);
    }

    document.querySelector('.catalog__btn-more').classList.remove('visually-hidden');
  };

  window.createListOfGoodsInDOM(window.listOfCards, NUMBER_OF_FIRST_LOADED_GOODS, '.catalog__cards', createCard);
  var arrayOfNextLoadGoods = window.listOfCards;

  document.querySelector('.catalog__btn-more').addEventListener('click', function (e) {
    e.preventDefault();
    var numberOfAddedGoods = document.querySelectorAll('.catalog__card').length;
    var numberOfLastGoods = window.NUMBER_OF_GOODS - numberOfAddedGoods;

    if (clickCounterBtnMore === 0) {
      arrayOfNextLoadGoods = arrayOfNextLoadGoods.slice(NUMBER_OF_FIRST_LOADED_GOODS);
    } else {
      arrayOfNextLoadGoods = arrayOfNextLoadGoods.slice(NUMBER_OF_NEXT_LOADED_GOODS);
    }

    if (numberOfAddedGoods < NUMBER_OF_GOODS && (NUMBER_OF_GOODS - numberOfAddedGoods) > NUMBER_OF_NEXT_LOADED_GOODS) {
      window.createListOfGoodsInDOM(arrayOfNextLoadGoods, NUMBER_OF_NEXT_LOADED_GOODS, '.catalog__cards', createCard);
    } else if (numberOfAddedGoods < NUMBER_OF_GOODS && (NUMBER_OF_GOODS - numberOfAddedGoods) <= NUMBER_OF_NEXT_LOADED_GOODS) {
      window.createListOfGoodsInDOM(arrayOfNextLoadGoods, numberOfLastGoods, '.catalog__cards', createCard);
      document.querySelector('.catalog__btn-more').classList.add('visually-hidden');
    }

    clickCounterBtnMore++;
    handleClickOnMoreButton();
  });

  function handleClickOnMoreButton() {
    document.querySelectorAll('.card__btn').forEach(function (elem, i) {
      elem.addEventListener('click', function (e) {
        e.preventDefault();

        window.addGoodInBasket(window.createBasketCardObj(window.listOfCards[i]), window.createBasketItem);
        window.removeGoodFromBasket();

        if (document.querySelectorAll('.goods_card').length > 0) {
          document.querySelector('.goods__card-empty').classList.add('visually-hidden');
          document.querySelector('.goods__total').classList.remove('visually-hidden');
        }
      });
    });
  }

  handleClickOnMoreButton();
})();

'use strict';

(function () {

  var BASKET = document.querySelector('.goods__cards');

  var basketList;

  window.createBasketItem = function (good) {
    return '<article class="goods_card card-order">' +
              '<a href="#" class="card-order__close">Удалить товар</a>' +
              '<header class="card-order__header">' +
                '<h3 class="card-order__title">' + good.name + '</h3>' +
                '<img src="' + good.picture + '" alt="' + good.name + '" class="card-order__img" width="265" height="264">' +
              '</header>' +
              '<div class="card-order__main">' +
                '<p class="card-order__price">' + good.price + ' ₽</p>' +
                '<div class="card-order__amount">' +
                  '<button type="button" class="card-order__btn card-order__btn--decrease">уменьшить</button>' +
                  '<label class="card-order__label">' +
                    '<span class="visually-hidden">Количество</span>' +
                    '<input class="card-order__count" name="gum-wasabi" value="1" type="text" id="card-order__gum-wasabi">' +
                  '</label>' +
                  '<button type="button" class="card-order__btn card-order__btn--increase">увеличить</button>' +
                '</div>' +
              '</div>' +
            '</article>';
  };

  function changeNumberOfOrederedGood(obj, card) {
    if (obj.amount > card.querySelector('.card-order__count').value) {
      var existingCardCount = card.querySelector('.card-order__count');

      existingCardCount.value = (+existingCardCount.value + 1).toString();
    }
  }

  function addExistingCardInBasket(obj, func) {
    var existingCard = [].find.call(BASKET.querySelectorAll('.goods_card'), function (card) {
      return obj.name.toLowerCase() === card.querySelector('.card-order__title').innerText.toLowerCase();
    });

    if (existingCard) {
      changeNumberOfOrederedGood(obj, existingCard);
    } else {
      BASKET.insertAdjacentHTML('beforeend', func(obj));
    }
  }

  window.addGoodInBasket = function (obj, func) {
    if (BASKET.querySelectorAll('.goods_card').length !== 0) {
      addExistingCardInBasket(obj, func);
    } else {
      BASKET.insertAdjacentHTML('beforeend', func(obj));
    }

    obj.orderedAmount++;
    counteBasketGoods('add');
  };

  window.removeGoodFromBasket = function () {
    document.querySelectorAll('.card-order__close').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;

        BASKET.removeChild(target.closest('.goods_card'));

        basketList = BASKET.querySelectorAll('.goods_card');
        counteBasketGoods('remove', basketList);
      });
    });
  };

  function counteBasketGoods(action) {
    var numberOfGoodsInBasket;
    var goodsInBasket = [].map.call(BASKET.querySelectorAll('.goods_card'), function (elem) {
      return +elem.querySelector('.card-order__count').value;
    });

    if (goodsInBasket.length > 0) {
      numberOfGoodsInBasket = goodsInBasket.reduce(function (acc, value) {
        return acc + value;
      });
    } else {
      numberOfGoodsInBasket = 0;
    }

    if (action === 'add') {
      document.querySelector('.main-header__basket').innerHTML = 'В корзине ' + numberOfGoodsInBasket + ' шт. товаров';
      document.querySelector('.goods__total-count').innerHTML =
        '<p class="goods__total-count">Итого за ' + numberOfGoodsInBasket + ' товаров: ' +
        '<span class="goods__price"> 0 ₽</span>' +
        '</p>';
    } else if (action === 'remove') {
      if (numberOfGoodsInBasket === 0) {
        document.querySelector('.goods__card-empty').classList.remove('visually-hidden');
        document.querySelector('.main-header__basket').textContent = 'В корзине ничего нет';
        document.querySelector('.goods__total').classList.add('visually-hidden');
      } else {
        document.querySelector('.main-header__basket').innerHTML = 'В корзине ' + numberOfGoodsInBasket + ' шт. товаров';
        document.querySelector('.goods__total-count').innerHTML =
          '<p class="goods__total-count">Итого за ' + numberOfGoodsInBasket + ' товаров: ' +
          '<span class="goods__price">0 ₽</span>' +
          '</p>';
      }
    }
  }

  window.createBasketCardObj = function (obj) {
    var basketCard = Object.assign({}, obj);
    basketCard.orderedAmount = 0;

    delete basketCard.nutritionFacts;
    delete basketCard.rating;
    delete basketCard.weight;

    return basketCard;
  };

})();

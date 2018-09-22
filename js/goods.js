'use strict';

var NAMES = ['Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'];

var IMG_PATH = ['img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'];

var CONTENTS_LIST = ['молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'];

var CLASSES_FOR_RATING = {
  1: 'stars__rating--one',
  2: 'stars__rating--two',
  3: 'stars__rating--three',
  4: 'stars__rating--four',
  5: 'stars__rating--five'
};

var NUMBER_OF_GOODS = 26;
var NUMBER_OF_FIRST_LOADED_GOODS = 13;
var NUMBER_OF_NEXT_LOADED_GOODS = 6;
var BASKET = document.querySelector('.goods__cards');

var listOfCards = createListOfGoods(NUMBER_OF_GOODS, NAMES, IMG_PATH, CONTENTS_LIST);
var clickCounterBtnMore = 0;
var basketList;


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElem(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getShuffleArray(arr) {
  var newArray = arr.slice();
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = t;
  }
  return newArray;
}

function getRandomLenghtOfArray(arr) {
  return arr.slice(0, getRandomNumber(1, arr.length));
}

function createItemOfGoods(name, image, contentsList) {
  return {
    name: name,
    picture: image,
    amount: getRandomNumber(0, 20),
    price: getRandomNumber(100, 1500),
    weight: getRandomNumber(30, 300),
    rating: {
      value: getRandomNumber(1, 5),
      number: getRandomNumber(10, 900)
    },
    nutritionFacts: {
      sugar: Boolean(getRandomNumber(0, 1)),
      energy: getRandomNumber(70, 500),
      contents: contentsList
    }
  };
}

function createListOfGoods(numberOfItems, names, images, contents) {
  var list = [];

  for (var i = 0; i < numberOfItems; i++) {
    list.push(createItemOfGoods(getRandomElem(names), getRandomElem(images), getRandomLenghtOfArray(getShuffleArray(contents))));
  }

  return list;
}

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

function createBasketItem(good) {
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
}

function createListOfGoodsInDOM(list, numberOfItems, containerClassName, func) {
  document.querySelector('.catalog__load').classList.add('visually-hidden');

  for (var i = 0; i < numberOfItems; i++) {
    document.querySelector(containerClassName).innerHTML += func(list[i]);
  }

  document.querySelector('.catalog__btn-more').classList.remove('visually-hidden');
}

createListOfGoodsInDOM(listOfCards, NUMBER_OF_FIRST_LOADED_GOODS, '.catalog__cards', createCard);
var arrayOfNextLoadGoods = listOfCards;

document.querySelector('.catalog__btn-more').addEventListener('click', function (e) {
  e.preventDefault();
  var numberOfAddedGoods = document.querySelectorAll('.catalog__card').length;
  var numberOfLastGoods = NUMBER_OF_GOODS - numberOfAddedGoods;

  if (clickCounterBtnMore === 0) {
    arrayOfNextLoadGoods = arrayOfNextLoadGoods.slice(NUMBER_OF_FIRST_LOADED_GOODS);
  } else {
    arrayOfNextLoadGoods = arrayOfNextLoadGoods.slice(NUMBER_OF_NEXT_LOADED_GOODS);
  }

  if (numberOfAddedGoods < NUMBER_OF_GOODS && (NUMBER_OF_GOODS - numberOfAddedGoods) > NUMBER_OF_NEXT_LOADED_GOODS) {
    createListOfGoodsInDOM(arrayOfNextLoadGoods, NUMBER_OF_NEXT_LOADED_GOODS, '.catalog__cards', createCard);
  } else if (numberOfAddedGoods < NUMBER_OF_GOODS && (NUMBER_OF_GOODS - numberOfAddedGoods) <= NUMBER_OF_NEXT_LOADED_GOODS) {
    createListOfGoodsInDOM(arrayOfNextLoadGoods, numberOfLastGoods, '.catalog__cards', createCard);
    document.querySelector('.catalog__btn-more').classList.add('visually-hidden');
  }

  clickCounterBtnMore++;
});


// addToFavorite

document.querySelectorAll('.card__btn-favorite').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.target.classList.toggle('card__btn-favorite--selected');
  });

});

function getTargetParent(el, className) {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.className && el.className.indexOf(className) > -1) {
      return el;
    }
  }
  return null;
}

// show or hide dropdown for card

document.querySelector('.catalog__cards').addEventListener('click', function (e) {
  var target = e.target;


  if (!target.classList.contains('card__btn-favorite') && !target.classList.contains('.card__btn-composition')) {
    var main = getTargetParent(e.target, 'catalog__card');

    main.querySelector('.card__main').classList.toggle('visually-hidden');
  }
});

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
    BASKET.innerHTML += func(obj);
  }
}

function addGoodInBasket(obj, func) {
  if (BASKET.querySelectorAll('.goods_card').length !== 0) {
    addExistingCardInBasket(obj, func);
  } else {
    BASKET.innerHTML += func(obj);
  }

  obj.orderedAmount++;
  counteBasketGoods('add');
}

function removeGoodFromBasket() {
  document.querySelectorAll('.card-order__close').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var target = e.target;

      BASKET.removeChild(target.closest('.goods_card'));

      basketList = BASKET.querySelectorAll('.goods_card');
      counteBasketGoods('remove', basketList);
    });
  });
}

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

function createBasketCardObj(obj) {
  var basketCard = Object.assign({}, obj);
  basketCard.orderedAmount = 0;

  delete basketCard.nutritionFacts;
  delete basketCard.rating;
  delete basketCard.weight;

  return basketCard;
}

document.querySelectorAll('.card__btn').forEach(function (elem, i) {
  elem.addEventListener('click', function (e) {
    e.preventDefault();

    addGoodInBasket(createBasketCardObj(listOfCards[i]), createBasketItem);
    removeGoodFromBasket();

    if (document.querySelectorAll('.goods_card').length > 0) {
      document.querySelector('.goods__card-empty').classList.add('visually-hidden');
      document.querySelector('.goods__total').classList.remove('visually-hidden');
    }
  });
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

'use strict';

(function () {

  window.cardData = {
    NAMES: ['Чесночные сливки',
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
      'Острый язычок'],
    IMG_PATH: ['img/cards/gum-cedar.jpg',
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
      'img/cards/soda-russian.jpg'],
    CONTENTS_LIST: ['молоко',
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
      'виллабаджо'],
    NUMBER_OF_GOODS: 26
  };

  window.listOfCards = createListOfGoods(window.cardData.NUMBER_OF_GOODS, window.cardData.NAMES, window.cardData.IMG_PATH, window.cardData.CONTENTS_LIST);

  function createItemOfGoods(name, image, contentsList) {
    return {
      name: name,
      picture: image,
      amount: window.helpers.getRandomNumber(0, 20),
      price: window.helpers.getRandomNumber(100, 1500),
      weight: window.helpers.getRandomNumber(30, 300),
      rating: {
        value: window.helpers.getRandomNumber(1, 5),
        number: window.helpers.getRandomNumber(10, 900)
      },
      nutritionFacts: {
        sugar: Boolean(window.helpers.getRandomNumber(0, 1)),
        energy: window.helpers.getRandomNumber(70, 500),
        contents: contentsList
      }
    };
  }

  function createListOfGoods(numberOfItems, names, images, contents) {
    var list = [];

    for (var i = 0; i < numberOfItems; i++) {
      list.push(createItemOfGoods(window.helpers.getRandomElem(names), window.helpers.getRandomElem(images), window.helpers.getRandomLenghtOfArray(window.helpers.getShuffleArray(contents))));
    }

    return list;
  }
})();

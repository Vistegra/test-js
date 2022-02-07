## Создайте одностраничный мини интернет-магазин:

Терминология:

- требуется разделить страницу на две части (вертикально или горизонтально, как удобно):
    в одной каталог товаров, во второй корзина.

### Часть 1- Каталог:

- каталог товаров хранится в файле product.json и имеет следующую структуру:
  * Простой продукт:
    * содержит цену
    * не содержит свойство SKU.
  * "Составной товар" или "товар с торговыми предложениями":
    * не содержит цену,
    * свойство SKU содержит торговые предложения, например:
      1. id: 827 - штакетник c цветом RAL 8017 длиной 1000мм и ценой 56$
      2. id: 828 - штакетник с цветом Ral 8017 длиной 1500мм и ценой 84$

```json
[
  {
    "ID": "1794",
    "NAME": "Труба профильная 80х80х2 мм - 3 м",
    "PRICE": "1440.00",
    "PICTURE": "/upload/iblock/b16/pipe-80-80-2.png",
    "...": "некоторые другие свойства"
  },
  {
    "ID": "168",
    "NAME": "Металлический штакетник - 100 мм. Односторонний RAL 8017",
    "PICTURE": "/upload/iblock/4d1/8017-100-1.jpg",
    "...": "некоторые другие свойства",
    "SKU": {
      "827": {
        "ID": "827",
        "NAME": "Штакетник металлический односторонний RAL 8017",
        "SORT": "500",
        "DEEP": 0.45,
        "LENGTH": 1000,
        "PRICE": "56.00",
        "WEIGHT": 0.44
      },
      "828": {
        "ID": "828",
        "NAME": "Штакетник металлический односторонний RAL 8017",
        "SORT": "500",
        "DEEP": 0.45,
        "LENGTH": 1500,
        "PRICE": "84.00",
        "WEIGHT": 0.44
      }
    }
  }
]
```

- каталог загрузить любым способом (будет плюсом использование php + ajax).
- каталог отображать сеткой или списком.
- Элемент каталога содержит:
  * Название товара;
  * Цена;
  * кнопку "добавить", которая добавляет товар в корзину;
  * Ссылку на картинку товара, например:
```html
<div class="img">/upload/iblock/4d1/8017-100-1.jpg</div>
```

### Часть 2- Корзина:

- Корзина в виде таблицы с итоговой суммой.
- Должна быть возможность изменять количество позиции, но не менее 1шт.
- Должна быть возможность удалять позиции.
- При добавлении одинаковых позиций, должно увеличиваться количество, а не добавляется еще одна.

### Будет плюсом

- Использование webpack.
- Каталог с фильтром (например по свойству TYPE или WIDTH).
- Элементы каталога с выпадающим списком торговых предложений, при этом цена отображается "от 50$" по минимальному значению из предложений.

Результат демонстрировать через **Github**

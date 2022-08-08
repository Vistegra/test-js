const tileButton = document.getElementById('tile-button');
const listButton = document.getElementById('list-button');
const viewProducts = document.getElementById('products');

// переключение внешнего вида на плитку
const changeViewOnTile = (event) => {

    viewProducts.classList.remove('products-list');
    viewProducts.classList.add('products-tile');

}

// переключение внешнего вида на список
const changeViewOnList = (event) => {

    viewProducts.classList.remove('products-tile');
    viewProducts.classList.add('products-list');

}

tileButton.addEventListener('click', changeViewOnTile);
listButton.addEventListener('click', changeViewOnList);

let cart = {}; // объект товаров в корзине

$('document').ready(function() {

    loadProducts();
    checkCart();
    showCart();

});

// загрузка каталога товаров на страницу
function loadProducts() {

    $.getJSON('product.json', function(data) {

        let out = '';

        for (const key in data) {

            if (data[key].hasOwnProperty("SKU")) {

                for (const prop in data[key].SKU) {

                    out += '<div>';
                    out += '<div class="img">' + data[key].PICTURE + '</div>';
                    out += '<p class="productName">' + data[key].SKU[prop].NAME + '.';

                    if (data[key].SKU[prop].LENGTH != '') {

                        out += ' Длина - ' + data[key].SKU[prop].LENGTH + ' мм.';

                    }

                    if (data[key].SKU[prop].DEEP != '') {

                        out += ' Толщина - ' + data[key].SKU[prop].DEEP + ' мм.';

                    }

                    out += '</p>';
                    out += '<p class="productPrice">' + data[key].SKU[prop].PRICE + ' руб.</p>';
                    out += '<button class="add" data-SKU-ID="' + prop + '" data-SKU-NAME="' + data[key].SKU[prop].NAME + '" data-SKU-PRICE="' + data[key].SKU[prop].PRICE + '">Добавить</button>';
                    out += '</div>';

                }

            } else {

                out += '<div>';
                out += '<div class="img">' + data[key].PICTURE + '</div>';
                out += '<p class="productName">' + data[key].NAME + '</p>';
                out += '<p class="productMissing">Нет в наличии</p>';
                out += '<button class="disabled" disabled>Добавить</button>';
                out += '</div>';

            }

        }

        $('#products').html(out);
        $('button.add').on('click', add);

    });

}

// добавление товара в корзину
function add() {

    const skuId = $(this).attr('data-SKU-ID');
    const skuName = $(this).attr('data-SKU-NAME');
    const skuPrice = $(this).attr('data-SKU-PRICE');

    if (cart[skuId] != undefined) {

        if (cart[skuId].count != undefined) {

            cart[skuId].count++;

        } else {

            cart[skuId].count = 1;
            cart[skuId].name = skuName;
            cart[skuId].price = skuPrice;

        }

    } else {

        cart[skuId] = {}
        cart[skuId].count = 1;
        cart[skuId].name = skuName;
        cart[skuId].price = skuPrice;

    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();

}

// проверка товаров в localStorage
function checkCart() {

    if (localStorage.getItem('cart') != null) {

        cart = JSON.parse(localStorage.getItem('cart'));

    }

}

// отображение товаров в корзине
function showCart() {

    if ($.isEmptyObject(cart)) {

        // корзина пуста;
        $('#cart').html('Корзина пуста');
    }

    else {

        let out = '<table><thead><tr><th>Наименование</th><th>Кол-во</th><th>Цена/шт</th><th colspan="2">Сумма</th></tr></thead><tbody>';
        let sum = 0;

        for (let key in cart) {

            out += '<tr><td>' + cart[key].name + '</td>';
            out += '<td><input type="text" value="' + cart[key].count + '" class="inp" data-art="' + key + '">';
            out += '<button class="plus" data-art="' + key + '">+</button>';
            out += '<button class="minus" data-art="' + key + '">-</button></td>';
            out += '<td>' + cart[key].price + '<span> руб.</span></td>';
            out += '<td>' + (cart[key].count * cart[key].price).toFixed(2) + '<span> руб.</span></td>';
            out += '<td><button class="delete" data-art="' + key + '">✖</button></td></tr>';

            sum += cart[key].count * cart[key].price;

        }

        out += '</tbody><tfoot><tr><td colspan="3">Итого</td><td colspan="2">' + sum.toFixed(2) + '<span> руб.</span></td></tr></tfoot></table>';

        $('#cart').html(out);
        $('.inp').on('input', checkInput);
        $('.inp').on('change', changeInput);
        $('.plus').on('click', plusProduct);
        $('.minus').on('click', minusProduct);
        $('.delete').on('click', deleteProduct);

        // проверка символов, вводимых в input
        function checkInput() {
            this.value = this.value.replace(/\D/g, '');
        }

        // изменение поля input
        function changeInput() {

            const articul = $(this).attr('data-art');
            cart[articul].count = this.value;
            saveCartToLS();
            showCart();

        }

        // нажатие на кнопку плюс '+'
        function plusProduct() {

            const articul = $(this).attr('data-art');
            cart[articul].count++;
            saveCartToLS();
            showCart();

        }

        // нажатие на кнопку минус '-'
        function minusProduct() {

            const articul = $(this).attr('data-art');

            if (cart[articul].count > 1) {

                cart[articul].count--;

            }

            saveCartToLS();
            showCart();

        }

        // нажатие на кнопку крестик 'x' (удаление)
        function deleteProduct() {

            const articul = $(this).attr('data-art');
            delete cart[articul];
            saveCartToLS();
            showCart();

        }

        // сохранение корзины в localStorage
        function saveCartToLS() {

            localStorage.setItem('cart', JSON.stringify(cart));

        }

    }

}

let dishes = [
    {
        'dishName': 'Pizza Margherita',
        'description': 'mit Tomatensauce und Käse',
        'price': 6.00
    },
    {
        'dishName': 'Pizza Salami',
        'description': 'mit Tomatensauce, Salami und Käse',
        'price': 7.00
    },
    {
        'dishName': 'Pizza Proscutto',
        'description': 'mit Tomatensauce, Schinken und Käse',
        'price': 7.00
    },
    {
        'dishName': 'Pizza Piccante',
        'description': 'mit Tomatensauce, Peperoniwurst und Käse',
        'price': 7.50
    },
    {
        'dishName': 'Pizza Rustica',
        'description': 'mit Tomatensauce, Salami, Schinken und Käse',
        'price': 8.00
    },
    {
        'dishName': 'Pizza Quattro Formaggi',
        'description': 'mit Tomatensauce und 4 Käsesorten',
        'price': 8.50
    },
    {
        'dishName': 'Frutti di Mare',
        'description': 'mit Tomatensauce, Meeresfrüchten und Käse',
        'price': 9.00
    },
    {
        'dishName': 'Pizza Calzone',
        'description': 'mit Tomatensauce, Paprika, Pilzen und Salami',
        'price': 9.00
    },
    
];


let shoppingBasket = [];
let prices = [];
let articleAmount = [];

function renderDishes() {
    document.getElementById('dishcontainer').innerHTML += "";

    for(let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];

        document.getElementById('dishcontainer').innerHTML += contentDishes(dish, i);
    }
}


function contentDishes(dish, i) {
    return `
    <div class="dishcontainer">
        <div class="dish-details">
            <h2 class="dish-name">${dish['dishName']}</h2>
            <p class="dish-description">${dish['description']}</p>
            <p class=dish-price>${dish['price'].toFixed(2)} €</p>
        </div>
        <div>
            <img onclick="addToCart(${i})" src="./img/plus.svg" alt="Add dish" class="add-button">
        </div>
    </div>
    `
}


function renderShoppingCart() {
    document.getElementById('shoppingcart').innerHTML += "";
    document.getElementById('shoppingcart').innerHTML += contentShoppingCart();
}


function contentShoppingCart() {
    return `<div class="cart-flex">
            <h2 class="responsive-d">Warenkorb</h2>
            <img src="./img/cart.svg" alt="Add dish" class="cart-img">
                <div class="css-switch d-none" id="removeClass">
                    <h1 class="cart-header">Fülle deinen Warenkorb</h1>
                    <p class="cart-description">Füge leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
                </div>
            </div>`
}


function updatedShoppingCart() {
    document.getElementById('removeClass').innerHTML = "";
    for(let i = 0; i < shoppingBasket.length; i++) {
        document.getElementById('removeClass').innerHTML += `<div id="removeItem" class="flex-cartcontainer">
            <p class="order-overview">${articleAmount[i]}x <b>${shoppingBasket[i]}:</b> ${prices[i].toFixed(2)}€</p><img src="./img/plus.svg" onclick="increaseAmount(${i})" class="plus-cart"><img src="./img/minus.svg" onclick="decreaseAmount(${i})" class="minus-cart">
        </div>`
    }
}


function addToCart(i) {

    let number = shoppingBasket.indexOf(dishes[i].dishName);
    if (number === -1) {
      shoppingBasket.push(dishes[i].dishName);
      prices.push(dishes[i].price);
      articleAmount.push(1);
    } else {
      articleAmount[number]++;
      prices[number] = dishes[i].price * articleAmount[number];
    }

    updatedShoppingCart();
    totalSum();
}

function increaseAmount(i) {
    if (articleAmount[i] >= 1) {
        articleAmount[i]++;
        prices[i] = dishes[i].price * articleAmount[i];
    } 
    updatedShoppingCart();
    totalSum();
}

function decreaseAmount(i) {
    if (articleAmount[i] >= 1) {
        articleAmount[i]--;
        prices[i] = dishes[i].price * articleAmount[i];
    } else {
        shoppingBasket.splice(i, 1);
        prices.splice(i, 1);
        articleAmount.splice(i, 1);
        document.getElementById('removeClass').classList.remove('flex-cartcontainer');    
    }
    updatedShoppingCart();
    totalSum();
}


function totalSum() {
    let sum = 0;

    for (let i = 0; i < prices.length; i++ ) {
        sum += prices[i];
    }

    document.getElementById('gesamt').innerHTML = "";
    document.getElementById('gesamt').innerHTML += `Gesamt: ${sum.toFixed(2)}€`;
}


function btnPay() {
    alert("Leider kann die Bestellung derzeit nicht verarbeitet werden. Bitte versuche es später erneut :-)")
}

function openBasket() {
    document.getElementById('removeClass');
    document.getElementById('deleteme2');
    let delete1 = document.getElementById('deleteme1')
    document.getElementById('removeClass').classList.remove('d-none');
    document.getElementById('deleteme2').classList.remove('d-none');
    document.getElementById('deleteme2').classList.add('warenkorböffnen');
    delete1.classList.add('d-none')
}

function closeBasket() {
    document.getElementById('removeClass');
    document.getElementById('deleteme2');
    let delete1 = document.getElementById('deleteme1')
    document.getElementById('removeClass').classList.add('d-none');
    document.getElementById('deleteme2').classList.add('d-none');
    delete1.classList.remove('d-none')
}
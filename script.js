//menus and prices from the rastaurant menu
const restaurantMenu = ["Pommes Kreation - Rotterdam", "Holländischer Burger", "Frikandel - Spezial", "Holländische Frikandel", "Holländische Pommes frites"];
const menuPrice = [7, 5.5, 4.6, 4, 3.5];

//menus, prices and amounts of menus in basket
let menus = [];
let prices = [];
let amounts = [];



let subtotal = 0;
let delCosts = 0;
let finalSum = 0;

function renderCart() {
    calculationSubtotal();
    calculationDelCosts();
    calculatefinalSum()

    addDishes();
    addItems()
}

//add items, if items ar in basket else show empty basket
function addItems() {
    if (amounts.length > 0) {
        document.getElementById('cart').innerHTML = ``;
        for (let i = 0; i < amounts.length; i++) {
            const dish = returnCartItem(i);
            document.getElementById('cart').innerHTML += dish;
        }
        addCardCalculation();
        addBottonBottom();
    } else {
        let emptyBasket = returnEmptyCart();
        document.getElementById('cart').innerHTML = emptyBasket;
        document.getElementById('calculation').innerHTML = ``; //remove calculation and buy botton
    }
}

//generate HTML dishes
function addDishes() {
    let html = returnDishes();
    let dishes = document.getElementById('dishesDiv');
    dishes.innerHTML = html;
}

//card calculation
function addCardCalculation() {
    let calculationDiv = document.getElementById('calculation');
    calculationDiv.innerHTML = `
        <div class="calculation">
            <span>Zwischensumme</span>
            <span>${subtotal} €</span>
        </div> 
        <div class="calculation">
            <span>Lieferkosten</span>
            <span>${delCosts} €</span>
         </div> 
        <div class="calculation">
            <span>Gesamt</span>
            <span>${finalSum} €</span>            
        </div>
        <div class="button-pay-div">
            <button class="button-pay pointer" type="submit">Bezahlen (${finalSum} €)</button>
        </div>
    `;
}

function calculationSubtotal() {
    let sum = 0;
    for (let i = 0; i < amounts.length; i++) {
        const price = prices[i];
        const amount = amounts[i];
        const costs = price * amount;
        sum += costs;
    }
    subtotal = sum;
}

function calculationDelCosts() {
    if (subtotal >= 25) {
        delCosts = 0;
    } else {
        delCosts = 1;
    }
}

function calculatefinalSum() {
    let sum = subtotal + delCosts;
    finalSum = sum;
}

//Add menu to arrays
function addMenu(menu, price) {
    let menuIndex = getMenuIndex(menu);
    if (menuIndex == -1) {
        menus.push(menu);
        prices.push(price);
        amounts.push(1);
    } else {
        let amount = amounts[menuIndex];
        let amountPlus = amount + 1; //increase amount of menu
        amounts[menuIndex] = amountPlus;
    }
    renderCart();
}

//Remove menu from arrays
function removeMenu(menu) {
    let menuIndex = getMenuIndex(menu);
    if (menuIndex > -1) {
        if (amounts[menuIndex] > 1) {
            const amount = amounts[menuIndex];
            newAmount = amount - 1;
            amounts[menuIndex] = newAmount;
        } else {
            menus.splice(menuIndex, 1);
            prices.splice(menuIndex, 1);
            amounts.splice(menuIndex, 1);
        }
    }
    renderCart();
}

// Return index of menu
function getMenuIndex(menu) {
    let index = menus.indexOf(menu);
    return (index);
}

//botton fixed at bottom of page seen on mobile devices
function addBottonBottom() {
    let orders = 0;
    for (let i = 0; i < amounts.length; i++) {
        const order = amounts[i];
        orders += order;
    }

    let BottonBottom = document.getElementById('btn-bottom');
    BottonBottom.innerHTML = `
    <button class="botton-bottom pointer" type="submit">
        <img class="botton-bottom-img" src="img/shopping-bag-2-48(1).png" alt="">
        <div class="botton-bottom-amount">
            <div class="text-center">${orders}</div>    
        </div>
        <div class="botton-bottom-text">Warenkorb (${finalSum} €)</div>
</button>
    `;
}

//change image of like button
function changeLikeImage() {
    var image = document.getElementById('likeButton');
    if (image.src.match("favorite-4")) {
        image.src = "img/favorite-5-32.png";
    } else {
        image.src = "img/favorite-4-32.png";
    }
}

//counts amout of one dish in basket
function returnDishAmount(menuNumber) {
    let menu = restaurantMenu[menuNumber];
    let index = getMenuIndex(menu);
    let amount = amounts[index];
    if (amount > 0) {
        return (amount);
    } else {

        return ('<img src="img/plus-8-48.png" alt="add">');
    }
}

function amountClass(menuNumber) {
    let dishAmountDiv = document.getElementById('dishAmountDiv');
    let menu = restaurantMenu[menuNumber]; //get menu from menu number
    let index = getMenuIndex(menu);        //get index from menu in basket
    let amount = amounts[index];           //get amount of menu in basket
    if (amount > 0) {
        let html = `amount-padding-top`;
        return (html);
    }
}

//----------------------HTML code----------------------------------------------------

function returnCartItem(i) {
    let menu = menus[i];
    let amount = amounts[i];
    let price = amount * prices[i];
    let priceSingle = prices[i];
    let html = `
    <div class="cart-item">
                            <div class="cart-item-left">
                                <strong class="cart-amount">${amount}</strong>
                            </div>
                            <div class="cart-item-right">
                                <div class="cart-item-top">
                                    <div class="cart-amount-space">
                                        <strong class="cart-dish">${menu}</strong>
                                        <span class="cart-price">${price} €</span>
                                    </div>
                                </div>
                                <div class="cart-item-middle">
                                    bitte Auswahl tätigen
                                </div>
                                <div class="cart-item-bottom">
                                    <div class="cart-item-bottom-note pointer">
                                        Anmerkungen hinzufügen
                                    </div>
                                    <div class="cart-item-bottom-img-div">
                                        <div>
                                            <img onclick="removeMenu('${menu}')" class="cart-item-bottom-img pointer" src="img/minus-2-48.png" alt="remove">
                                        </div>
                                        <div>
                                            <img onclick="addMenu('${menu}', ${priceSingle})" class="cart-item-bottom-img pointer" src="img/plus-8-48.png" alt="add">
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-item-line">
                                </div>
                            </div>

                        </div>
    `;
    return (html);
}


//empty card
function returnEmptyCart() {
    let html = `<div class="emty-shopping-cart">
    <div><img class="shopping-cart-img" src="img/shopping-bag-2-48.png" alt=""></div>
    <div class="text-center title-shopping-cart">Fülle deinen Warenkorb</div>
    <div class="text-center shopping-cart-call">Füge einige leckere Gerichte aus der Speisekarte
        hinzu und bestelle dein Essen.</div>
    </div>`;
    return (html);
}



//add dishes to HTML
function returnDishes() {
    let html = `
    <div>
    <div id="dishes1">
        <h2>
            Beliebte Gerichte
        </h2>
    </div>

    <div class="dish" onclick="addMenu('${restaurantMenu[0]}', ${menuPrice[0]})">
        <!-- left -->
        <div>
            <h3 class="margin-bottom-8">
            ${restaurantMenu[0]}
                <div class="produkt-info">Produktinfo</div>
            </h3>
            <p class="text margin-bottom-8">
                mit Zutaten nach Wahl
            </p>
            <p class="text-2 margin-bottom-8">
                <i>Wahl aus: mit Frühlingszwiebeln, Kirschtomaten und Gouda, vegetarisch,
                    mit
                    Garnelen,
                    Frühlingszwiebeln und Samurai-Sauce, mit Hähnchenfleisch, Gratin-Sauce
                    und
                    Champignons, mit Pulled Beef, roten Zwiebeln, Gouda und
                    Andalouise-Sauce,
                    mit
                    Rinderhackfleisch, Jalapenos, Samurai- und Barbecuesauce und mehr.
                </i>
            </p>
            <p class="price">
                ${menuPrice[0]} €
            </p>

        </div>
        <!-- right -->
        <div><div class="add-symbol">
        <div class="${amountClass(0)}">
            ${returnDishAmount(0)}
        </div>
        </div>
        </div>

    </div>
    <div class="dish" onclick="addMenu('${restaurantMenu[1]}', ${menuPrice[1]})">
        <!-- left -->
        <div>
            <h3 class="margin-bottom-8">
                ${restaurantMenu[1]}
                <div class="produkt-info">Produktinfo</div>
            </h3>
            <p class="text margin-bottom-8">
                mit einem Patty nach Wahl, Eisbergsalat, Tomaten, Gurken und Snacksauce
            </p>
            <p class="text-2 margin-bottom-8">
                <i>
                    Wahl aus: mit Rindfleisch-Patty, mit Homestyle Chicken Fingers, mit
                    Bacon, mit Cheddar und mit Jalapenos.</i>
            </p>
            <p class="price">
                ${menuPrice[1]} €
            </p>

        </div>
        <!-- right -->
        <div><div class="add-symbol">
        <div class="${amountClass(1)}">
            ${returnDishAmount(1)}
        </div>
        </div>
        </div>

    </div>
    <div class="dish" onclick="addMenu('${restaurantMenu[2]}', ${menuPrice[2]})">
        <!-- left -->
        <div>
            <h3 class="margin-bottom-8">
                ${restaurantMenu[2]}
                <div class="produkt-info">Produktinfo</div>
            </h3>
            <p class="text margin-bottom-8">
                mit roten Zwiebeln, Mayonnaise und würzigem Ketchup
            </p>
            <p class="text-2 margin-bottom-8">
                <i>
                </i>
            </p>
            <p class="price">
                ${menuPrice[2]} €
            </p>

        </div>
        <!-- right -->
        <div><div class="add-symbol">
        <div class="${amountClass(2)}">
            ${returnDishAmount(2)}
        </div>
        </div>
        </div>

    </div>

    <div class="h2-div" id="dishes2">
        <img class="h2-picture" src="img/Hollaendische-Spezialitäten.avif" alt="">
        <h2>
            Holländische Spezialitäten
        </h2>
    </div>
    <div class="dish" onclick="addMenu('${restaurantMenu[3]}', ${menuPrice[3]})">
        <!-- left -->
        <div>
            <h3 class="margin-bottom-8">
                ${restaurantMenu[3]}
                <div class="produkt-info">Produktinfo</div>
            </h3>
            <p class="text margin-bottom-8">
                im Brot mit Ketchup
            </p>
            <p class="text-2 margin-bottom-8">
                <i>
                </i>
            </p>
            <p class="price">
                ${menuPrice[3]} €
            </p>

        </div>
        <!-- right -->
        <div><div class="add-symbol">
        <div class="${amountClass(3)}">
            ${returnDishAmount(3)}
        </div>
        </div>
        </div>

    </div>
    <div class="dish" onclick="addMenu('${restaurantMenu[2]}', ${menuPrice[2]})">
        <!-- left -->
        <div>
            <h3 class="margin-bottom-8">
                ${restaurantMenu[2]}
                <div class="produkt-info">Produktinfo</div>
            </h3>
            <p class="text margin-bottom-8">
                mit roten Zwiebeln, Mayonnaise und würzigem Ketchup
            </p>
            <p class="text-2 margin-bottom-8">
                <i>
                </i>
            </p>
            <p class="price">
                ${menuPrice[2]} €
            </p>

        </div>
        <!-- right -->
        <div><div class="add-symbol">
        <div class="${amountClass(2)}">
            ${returnDishAmount(2)}
        </div>
        </div>
        </div>

    </div>
    <div class="dish" onclick="addMenu('${restaurantMenu[4]}', ${menuPrice[4]})">
        <!-- left -->
        <div>
            <h3 class="margin-bottom-8">
                ${restaurantMenu[4]}
                <div class="produkt-info">Produktinfo</div>
            </h3>
            <p class="text margin-bottom-8">
                handgeschnitten, dazu wird eine Sauce nach Wahl serviert
            </p>
            <p class="text-2 margin-bottom-8">
                <i>Wahl aus: mit Andalouise-Sauce, mit Chipotle-Mayonnaise, vegan, mit
                    Joppie-Sauce, mit Ketchup, holländisch, würzig, mit Knoblauchsauce,
                    hausgemacht und mehr.
                </i>
            </p>
            <p class="price">
                ${menuPrice[4]} €
            </p>

        </div>
        <!-- right -->
        <div><div class="add-symbol">
        <div class="${amountClass(4)}">
            ${returnDishAmount(4)}
        </div>
        </div>
        </div>

    </div>
    <div class="dish" onclick="addMenu('${restaurantMenu[0]}', ${menuPrice[0]})">
        <!-- left -->
        <div>
            <h3 class="margin-bottom-8">
                ${restaurantMenu[0]}
                <div class="produkt-info">Produktinfo</div>
            </h3>
            <p class="text margin-bottom-8">
                mit Zutaten nach Wahl
            </p>
            <p class="text-2 margin-bottom-8">
                <i>Wahl aus: mit Frühlingszwiebeln, Kirschtomaten und Gouda, vegetarisch,
                    mit
                    Garnelen,
                    Frühlingszwiebeln und Samurai-Sauce, mit Hähnchenfleisch, Gratin-Sauce
                    und
                    Champignons, mit Pulled Beef, roten Zwiebeln, Gouda und
                    Andalouise-Sauce,
                    mit
                    Rinderhackfleisch, Jalapenos, Samurai- und Barbecuesauce und mehr.
                </i>
            </p>
            <p class="price">
                ${menuPrice[0]} €
            </p>

        </div>
        <div><div class="add-symbol">
        <div class="${amountClass(0)}">
            ${returnDishAmount(0)}
        </div>
        </div>
        </div>

    </div>
</div>
    `;
    return (html);
}


//adjust amount ad selection menu
// coming soon
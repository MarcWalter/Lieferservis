menus = [];
prices = [];
amounts = [];

// Return value of any inputfield
function getValueFromInput(id) {
    let value = document.getElementById(id).value;
    return (value);
};

//   Return and trim value of menu input
function getMenuFromInput() {
    let menuValue = getValueFromInput('menu');
    let menuTrim = menuValue.trim();
    return (menuTrim);
}

//    Return and valisation of price input
function getPriceFromInput() {
    let priceValue = getValueFromInput('price');
    let priceNumber = Number(priceValue);
    return (priceNumber);
}

// Add menu to Arrays
function onAddMenu() {
    let menu = getMenuFromInput();
    let price = getPriceFromInput();
    let menuIndex = getMenuIndex(menu);
    if (menuIndex == -1) {
        menus.push(menu);
        prices.push(price);
        amounts.push(1);
    } else {
        console.log('Hi');
        let amount = amounts[menuIndex];
        let amountPlus = amount +1; //increase amount of menu
        amounts[menuIndex] = amountPlus;
        console.log(amountPlus);
    }




}

// Return index of menu
function getMenuIndex(menu) {
    let index = menus.indexOf(menu);
    return (index);
}
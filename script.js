const cartCount = document.querySelector(".cart-count");
let cartDataIdArray = [];

addMainScreenItem(items);  //add html content to main screen

function addMainScreenItem(dataArray) {
    const itemsContainer = document.querySelector(".items-container");
    let innerHtmlData = ``;
    dataArray.forEach((dataObject) => {
        innerHtmlData += `<div class="item-container">
        <img class="item-image" src="${dataObject.image}" alt="ItemImage" />
        <div class="rating">${dataObject.rating.stars}⭐ | ${dataObject.rating.count}</div>
        <div class="brand-name">${dataObject.company}</div>
        <div class="item-name">${dataObject.item_name}</div>
        <div class="price">
        <span class="current-price">Rs ${dataObject.current_price}</span>
        <span class="original-price">Rs ${dataObject.original_price}</span>
        <span class="discount">(${dataObject.discount_percentage} OFF)</span>
        </div>
        <button class="cart-button" onclick="cartDataId(${dataObject.id})">Add to Bag</button>
        </div>`

    })
    itemsContainer.innerHTML = innerHtmlData;
}

function visiblityOfCartCount() {
    if (cartDataIdArray.length > 0) {
        (cartCount.style.visibility = "visible");
        cartCount.innerHTML = cartDataIdArray.length;
    }
    else { cartCount.style.visibility = "hidden" };
}

function cartDataId(dataId) {
    cartDataIdArray.push(dataId);
    localStorage.setItem("cartData", JSON.stringify(cartDataIdArray));
    visiblityOfCartCount()
}

window.onload = () => {
    const cartData = localStorage.getItem("cartData");
    cartDataIdArray = cartData ? JSON.parse(cartData) : [];
    visiblityOfCartCount();
}
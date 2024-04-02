const cartCount = document.querySelector(".cart-count");
const cart = document.querySelector("#cart");
const cartContainer = document.querySelector(".cart-container");
const mainContainer = document.querySelector('.items-container');

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

function addCartScreenItem(cartDataIds) {
    const cartItemDetails = document.querySelector(".cart-item-details");
    let cartInnerHtmlData = ``;

    cartDataIds.forEach((dataId) => {
        const dataFromId = items.find((data) => data.id == dataId);
        cartInnerHtmlData +=
            `<div class="cart-item-template" id="${dataId}">
                <div class="cart-item-image">
                <img src="${dataFromId.image}" alt="ItemImage" />
                </div>
                <div class="template-content">
                    <div class="cart-brand-name">${dataFromId.company}</div>
                    <div class="cart-item-name">
                    ${dataFromId.item_name}
                    </div>
                    <div class="cartitem-seller-name">Sold by: Truenet Commerce</div>
                    <div class="cart-and-quantity">
                        <div class="cartitem-size">Size: M</div>
                        <div class="cartitem-quentity">Qty: 1</div>
                    </div>
                    <div class="cart-price">
                        <span class="cartitem-current-price">Rs ${dataFromId.current_price}</span>
                        <span class="cartitem-original-price">Rs ${dataFromId.original_price}</span>
                        <span class="cartitem-discount">${dataFromId.discount_percentage}% OFF</span>
                    </div>
                    <div class="cartitem-return-tag">
                        <span
                        class="material-symbols-outlined return-symbol"
                        id="return-symbol"
                        >
                        undo
                        </span>
                        <span>14 days</span>
                        return availiable
                    </div>
                </div>
                <span class="material-symbols-outlined" id="remove-cart-item" onclick="removeCartItem(${dataId})">close</span>
            </div>`
    })

    cartItemDetails.innerHTML = cartInnerHtmlData;
}

function visiblityOfCartCount() {
    if (cartDataIdArray.length > 0) {
        cartCount.style.visibility = "visible";
        cartCount.innerHTML = cartDataIdArray.length;
    }
    else { cartCount.style.visibility = "hidden" };
}

function cartDataId(dataId) {
    cartDataIdArray.push(dataId);
    localStorage.setItem("cartData", JSON.stringify(cartDataIdArray));
    paymentDetails(cartDataIdArray);
    visiblityOfCartCount()
}

function removeCartItem(id) {
    const indexOfCartDataIdArray = cartDataIdArray.indexOf(id);
    cartDataIdArray.splice(indexOfCartDataIdArray, 1);
    localStorage.setItem("cartData", JSON.stringify(cartDataIdArray));
    paymentDetails(cartDataIdArray);
    addCartScreenItem(cartDataIdArray);
    visiblityOfCartCount();
}

function paymentDetails(cartDataIds) {
    const totalMRP = document.querySelector("#total-mrp");
    const discountedMRP = document.querySelector("#discount-mrp");
    const TOTAL = document.querySelector("#total-amount");

    let totalOriginalMRP = 0;
    let totalDiscountMRP = 0;
    cartDataIds.forEach((id) => {
        const dataObject = items.find((data) => data.id == id);
        totalOriginalMRP += dataObject.original_price;
        totalDiscountMRP += dataObject.current_price;
    })
    totalMRP.innerHTML = totalOriginalMRP.toLocaleString();
    discountedMRP.innerHTML = totalDiscountMRP.toLocaleString();
    let tp = totalOriginalMRP - totalDiscountMRP;
    TOTAL.innerHTML = tp.toLocaleString();;
}

window.onload = () => {
    const cartData = localStorage.getItem("cartData");
    cartDataIdArray = cartData ? JSON.parse(cartData) : [];
    addCartScreenItem(cartDataIdArray);
    paymentDetails(cartDataIdArray);
    visiblityOfCartCount();
}

cart.addEventListener("click", () => {
    if (cartContainer.style.display == "block") {
        mainContainer.style.display = 'flex';
        cartContainer.style.display = "none";
    }
    else {
        cartContainer.style.display = "block";
        addCartScreenItem(cartDataIdArray);
        mainContainer.style.display = 'none';

    }
})




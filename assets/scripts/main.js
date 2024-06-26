const cartCount = document.querySelector(".cart-count");
const cart = document.querySelector("#cart");
const cartContainer = document.querySelector(".cart-container");
const mainContainer = document.querySelector('.main');

let cartDataIdArray = [];

function addItemOfId(id) {
    const cartItemDetails = document.querySelector(".cart-item-details");
    const dataFromId = items.find((data) => data.id == id);
    let cartInnerHtmlData =
        `<div class="cart-item-template" id="a${id}">
        <div class="cart-item-image">
        <img src="${dataFromId.image.image1}" alt="ItemImage" />
        </div>
        <div class="template-content">
            <div class="cart-brand-name">${dataFromId.company}</div>
            <div class="cart-item-name">
            ${dataFromId.item_name}
            </div>
            <div class="cartitem-seller-name">Sold by: Truenet Commerce</div>
            <div class="cart-and-quantity">
                <div class="cartitem-size">Size: M</div>
                <div class="cartitem-quantity">1</div>
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
        <span class="material-symbols-outlined" id="remove-cart-item" onclick="removeCartItem('${id}')">close</span>
    </div>`;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = cartInnerHtmlData;
    cartItemDetails.appendChild(tempElement.firstChild);
}

function addCartScreenItem(cartDataIds) {
    cartDataIds.forEach((dataId) => {
        const cartElement = document.getElementById(`a${dataId}`);
        if (!cartElement) {
            addItemOfId(dataId);
        }
        else {
            const cartItemQuentity = cartElement.querySelector(".cartitem-quantity");
            cartItemQuentity.innerHTML = Number(cartItemQuentity.innerHTML) + 1;
        }
    });
};

function visiblityOfCartCount() {
    if (cartDataIdArray.length > 0) {
        cartCount.style.visibility = "visible";
        cartCount.innerHTML = cartDataIdArray.length;
    }
    else { cartCount.style.visibility = "hidden" };
}

function addToCart(dataId) {
    cartDataIdArray.push(dataId); //add item id to array first
    localStorage.setItem("cartData", JSON.stringify(cartDataIdArray)); //also change local storage

    const cartItemQuantity = document.querySelector(`#a${dataId} .cartitem-quantity`);

    if (!cartItemQuantity) {
        addItemOfId(dataId);
    }
    else {
        cartItemQuantity.innerHTML = Number(cartItemQuantity.innerHTML) + 1;
    }
    paymentDetails(cartDataIdArray);  //update payment section
    visiblityOfCartCount();  //update kart counter
}

function removeCartItem(id) {
    const indexOfCartDataIdArray = cartDataIdArray.indexOf(id);
    cartDataIdArray.splice(indexOfCartDataIdArray, 1);
    localStorage.setItem("cartData", JSON.stringify(cartDataIdArray));

    const cartItemToRemove = document.getElementById(`a${id}`);
    const cartItemQuantity = cartItemToRemove.querySelector(".cartitem-quantity");

    const qty = Number(cartItemQuantity.innerHTML) - 1;

    (qty == 0) ? cartItemToRemove.remove() : (cartItemQuantity.innerHTML = qty);

    paymentDetails(cartDataIdArray);
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
        mainContainer.style.display = 'grid';
        cartContainer.style.display = "none";
    }
    else {
        cartContainer.style.display = "block";
        mainContainer.style.display = 'none';
    }
})
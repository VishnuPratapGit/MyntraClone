const searchBar = document.querySelector(".searchbar");
const searchInput = searchBar.querySelector("input");

searchInput.addEventListener("focus", function () {
    searchBar.classList.add("focused");
});

searchInput.addEventListener("blur", function () {
    searchBar.classList.remove("focused");
});


// searh items based on input
const itemName = document.querySelectorAll('.item-name');

function searchItems() {
    itemName.forEach((item, index) => {
        if (item.textContent.toUpperCase().indexOf(searchInput.value.toUpperCase()) > -1) {
            item.parentElement.parentElement.style.display = "";
        } else {
            item.parentElement.parentElement.style.display = "none";
        }
    })
}
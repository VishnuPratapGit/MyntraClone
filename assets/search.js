const searchBar = document.querySelector(".searchbar");
const searchInput = searchBar.querySelector("input");

searchInput.addEventListener("focus", function () {
    searchBar.classList.add("focused");
});

searchInput.addEventListener("blur", function () {
    searchBar.classList.remove("focused");
});
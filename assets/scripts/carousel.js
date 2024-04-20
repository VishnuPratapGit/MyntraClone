const carouselSlide = document.querySelector('.carousel-slide');
const images = carouselSlide.querySelectorAll('.carousel-slide img');
const radioButtons = document.querySelectorAll(".radio-buttons input");

let currentIndex = 1;

function slide(index) {
    currentIndex = index % images.length;
    radioButtons[currentIndex].checked = 1;
    let width = images[currentIndex].clientWidth;
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    carouselSlide.style.transform = `translateX(${-width * currentIndex}px)`;

    if (currentIndex === images.length - 1) {
        setTimeout(() => {
            radioButtons[0].checked = 1;
            carouselSlide.style.transition = 'none';
            carouselSlide.style.transform = `translateX(0)`;
        }, 500);
    }

    currentIndex = currentIndex + 1;
}

radioButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        slide(index);
    })
})



setInterval(() => {
    slide(currentIndex);
}, 5000)
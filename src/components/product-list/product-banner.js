const $prevBtn = document.querySelector(".banner__prev-btn");
const $bannerSlide = document.querySelectorAll(".banner-slide");
$prevBtn.addEventListener("click", () => {});

function renderBanner(product) {
    console.log(product);
    product.forEach((product, i) => {
        $bannerSlide[i].style.backgroundImage = `url("${product.image}")`;
    });
}

export { renderBanner };

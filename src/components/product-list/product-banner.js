const $banner = document.querySelector(".banner");
const $prevBtn = document.querySelector(".banner__prev-btn");
const $nextBtn = document.querySelector(".banner__next-btn");
const $bannerSlides = document.querySelector(".banner-slides");
const $bannerSlide = document.querySelectorAll(".banner-slide");
const $bannerListBtn = document.querySelectorAll(".banner-list__btn");

// 배너 이미지 넣기
function renderBanner(product) {
    product.forEach((product, i) => {
        $bannerSlide[i].style.backgroundImage = `url("${product.image}")`;
        listColor();
        $bannerSlide[i].addEventListener("click", () => {
            location.href = `./product-details.html?id=${product.id}`;
        });
    });
}

let intervalId; // 자동 슬라이드 멈추기 기능에 사용
// 자동 슬라이드
function intervalBanner() {
    intervalId = setInterval(() => {
        if (currentIndex !== $bannerSlide.length - 1) {
            moveBanner(currentIndex + 1);
        } else {
            moveBanner(0);
        }
    }, 3000);
}

// 슬라이드 멈춤
function stopInterval() {
    clearInterval(intervalId);
}

// 배너에 마우스 오버 시 자동 슬라이드 멈춤
$banner.addEventListener("mouseover", () => {
    stopInterval();
});

// 배너에서 마우스 아웃 시 자동 슬라이드
$banner.addEventListener("mouseout", () => {
    intervalBanner();
});

let currentIndex = 0; // 현재 배너 위치 인덱스
// 배너 슬라이드 적용 함수
function moveBanner(num) {
    $bannerSlides.style.transform = `translateX(${-num * 100}vw)`;
    currentIndex = num;
    listColor();
}

// 이전 버튼 클릭 시 이전 배너로
$prevBtn.addEventListener("click", () => {
    if (currentIndex !== 0) {
        moveBanner(currentIndex - 1);
    }
});

// 다음 버튼 클릭 시 다음 배너로
$nextBtn.addEventListener("click", () => {
    if (currentIndex !== $bannerSlide.length - 1) {
        moveBanner(currentIndex + 1);
    }
});

// 배너 리스트 색상 표시
function listColor() {
    $bannerListBtn.forEach((_, i) => {
        $bannerListBtn[i].style.backgroundColor =
            i === currentIndex ? "#000" : "#fff";
    });
}

// 배너 리스트 버튼 클릭 시 해당 배너로 이동
$bannerListBtn.forEach((_, i) => {
    $bannerListBtn[i].addEventListener("click", () => {
        moveBanner(i);
    });
});
export { renderBanner, intervalBanner };

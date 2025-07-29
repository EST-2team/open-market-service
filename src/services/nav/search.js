export function initSearch() {
    const searchInput = document.getElementById("search");
    const searchBtn = document.querySelector(".search-btn");
    const productList = document.querySelector(".product-list");

    if (!searchInput || !searchBtn || !productList) {
        console.warn("검색 요소가 준비되지 않았습니다.");
        return;
    }

    async function searchProducts(query) {
        if (!query.trim()) {
            productList.innerHTML = "<li>검색어를 입력해주세요.</li>";
            return;
        }

        try {
            productList.innerHTML = "<li>검색 중...</li>";

            const res = await fetch(
                `https://api.wenivops.co.kr/services/open-market/products/?search=${encodeURIComponent(query)}`
            );
            if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`);

            const data = await res.json();

            if (data.count === 0) {
                productList.innerHTML = "<li>검색 결과가 없습니다.</li>";
                return;
            }

            productList.innerHTML = data.results
                .map(
                    (product) => `
                    <li class="product-item" data-id="${product.id}" aria-label="상품 상세보기">
                        <img class="product-item__img" src="${product.image}" alt="${product.info}" />       
                        <p class="product-item__seller" aria-label="판매점">
                            ${product.seller.store_name}
                        </p>
                        <h3 class="product-item__info" aria-label="제품명">
                            ${product.info}
                        </h3>
                        <p class="product-item__price" aria-label="가격">
                            <span class="product-item__price--num">${product.price.toLocaleString()}</span>원
                        </p>
                    </li>
                `
                )
                .join("");
            searchInput.value = "";

            productList.addEventListener("click", (e) => {
                const target = e.target.closest(".product-item");
                if (target) {
                    const id = target.dataset.id;
                    location.href = `./product-details.html?id=${id}`;
                }
            });
        } catch (error) {
            productList.innerHTML = `<li>오류 발생: ${error.message}</li>`;
        }
    }

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        searchProducts(searchInput.value);
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchProducts(searchInput.value);
        }
    });
}

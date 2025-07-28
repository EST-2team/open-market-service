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
        <li class="product-item">
          <h3>${product.name}</h3>
          <p>${product.info}</p>
          <p>가격: ${product.price.toLocaleString()}원</p>
          <p>배송 방법: ${product.shipping_method}</p>
          <img src="${product.image}" alt="${product.name}" width="150" />
        </li>
      `
                )
                .join("");
        } catch (error) {
            productList.innerHTML = `<li>오류 발생: ${error.message}</li>`;
        }
    }

    searchBtn.addEventListener("click", () => {
        searchProducts(searchInput.value);
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            searchProducts(searchInput.value);
        }
    });
}

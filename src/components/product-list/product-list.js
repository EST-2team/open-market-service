const $productList = document.querySelector(".product-list");

function renderProduct(products) {
    $productList.innerHTML = "";
    products.forEach((product) => {
        const li = document.createElement("li");

        li.classList.add("product-item");
        li.setAttribute("id", `${product.id}`);
        li.setAttribute("aria-label", `상품 상세보기`);
        // li.style.cursor = "pointer"; // css로 구현 예정

        li.innerHTML = `
            <div class="product-item__img">
                <img src="${product.image}" alt="${product.info}" />
            </div>
            <p class="product-item__seller" aria-label="판매점">
                ${product.seller.store_name}
            </p>
            <h3 class="product-item__info" aria-label="제품명">
                ${product.info}
            </h3>
            <p class="product-item__price" aria-label="가격">
                ${product.price.toLocaleString()}
            </p>
        `;

        $productList.appendChild(li);

        li.addEventListener("click", () => {
            location.href = `./product-details.html?id=${product.id}`;
        });
    });
}

export { renderProduct };

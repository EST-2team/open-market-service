import { fetchProductById } from "../../services/product-details/product-datails-api.js";
import { addCartItems, fetchCartList } from "../../services/cart/cart-api.js";
import { renderToCartModal } from "./product-details-modal.js";

const $productImg = document.querySelector(".product-details__img");
const $productInfo = document.querySelector(".product-details__constents-info");
const $productTotal = document.querySelector(".product-total");

const $toCartModal = document.querySelector(".to-cart-modal");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let currentProduct = null;
let productQuantity = 1;

// url id 값으로 해당 데이터 가져오기
async function loadProductDetail() {
    const product = await fetchProductById(productId);
    if (product) {
        currentProduct = product;
        renderProductDetail(product);
        quantityBtnEventListener();
        cartBtnEventListener();
        buyBtnEventListener();
    } else {
        alert("상품 정보를 불러올 수 없습니다.");
    }
}

// 해당 상품 정보 렌더 함수
function renderProductDetail(product) {
    if (product) {
        $productImg.innerHTML = `
            <img src="${product.image}" alt="${product.info}">
        `;

        $productInfo.innerHTML = `
        <p class="product-details__seller" aria-label="판매점">
            ${product.seller.store_name}
        </p>
        <h3 class="product-details__info" aria-label="제품명">
            ${product.info}
        </h3>
        <p class="product-details__price" aria-label="가격">
            <span id="total-amount">${product.price.toLocaleString()}</span>원
        </p>
        <p class="delivery-options">${product.shipping_method === "PARCEL" ? "택배배송" : "직접배송"} / ${product.shipping_fee !== 0 ? `${product.shipping_fee.toLocaleString()}원` : "무료배송"}</p>
        <hr class="division"/>
        <div class="product-quantity">
            <button class="product-quantity__minus" type="button" aria-label="${product.info} 수량 감소 버튼"></button>
            <p class="product-quantity__total" aria-label="현재 수량">${productQuantity}</p>
            <button class="product-quantity__plus" type="button" aria-label="${product.info} 수량 증가 버튼"></button>
        </div>
        <hr />
        `;

        $productTotal.innerHTML = `
            <p class="product-total__text--strong">총 상품 금액</p>
            <p class="product-total__result">
                총 수량 <span class="product-total__quantity">${productQuantity}</span>개<span class="product-total-div">|</span><span class="product-total__amount--strong">${(product.price * productQuantity).toLocaleString()}</span><span class="product-total__won">원</span>
            </p>
        `;

        if (product.stock === 0) {
            plusBtnDisabled();
            soldOut();
        }
    } else {
        console.log("상품 상세 정보 불러오기 실패", error.message);
        alert("상품 상세 정보를 불러오지 못했습니다.");
    }
}

// 수량 버튼 클릭 이벤트 함수
function quantityBtnEventListener() {
    const $minusBtn = document.querySelector(".product-quantity__minus");
    const $plusBtn = document.querySelector(".product-quantity__plus");
    if ($minusBtn) {
        $minusBtn.addEventListener("click", decreaseQuantity);
    }

    if ($plusBtn) {
        $plusBtn.addEventListener("click", increaseQuantity);
    }
}

// 수량 감소 함수
function decreaseQuantity() {
    const $plusBtn = document.querySelector(".product-quantity__plus");
    if (productQuantity > 1) {
        productQuantity--;
        updateQuantity();
    }

    if ($plusBtn.disabled) {
        $plusBtn.disabled = false;
        $plusBtn.style.cursor = "pointer";
    }
}

// 수량 증가 함수
function increaseQuantity() {
    if (productQuantity < currentProduct.stock) {
        productQuantity++;
        updateQuantity();

        if (productQuantity >= currentProduct.stock) {
            plusBtnDisabled();
        }
    }
}

// 수량 증가 버튼 비활성화 함수
function plusBtnDisabled() {
    const $plusBtn = document.querySelector(".product-quantity__plus");
    $plusBtn.setAttribute("disabled", true);
    $plusBtn.style.cursor = "not-allowed";
}

// 수량 표시 업데이트 함수
function updateQuantity() {
    const $quantity = document.querySelector(".product-quantity__total");
    const $totalQuantity = document.querySelector(".product-total__quantity");
    const $totalAmount = document.querySelector(
        ".product-total__amount--strong"
    );

    if ($quantity && $totalQuantity && $totalAmount && currentProduct) {
        $quantity.textContent = productQuantity;
        $totalQuantity.textContent = productQuantity;
        $totalAmount.textContent = (
            currentProduct.price * productQuantity
        ).toLocaleString();
    }
}

// 재고 없을 시 품절 표시 함수
function soldOut() {
    const $buyOrCart = document.querySelector(".buy-or-cart");
    const $soldOut = document.querySelector(".sold-out");
    $buyOrCart.style.display = "none";
    $soldOut.style.display = "block";
}
function buyBtnEventListener() {
    const $buyBtn = document.querySelector(".buy-btn");

    if ($buyBtn) {
        $buyBtn.addEventListener("click", directOrder);
    }
}
function directOrder() {
    const orderPageUrl = `../pages/order.html?order_type=direct_order&product=${productId}&quantity=${productQuantity}`;
    window.location.href = orderPageUrl;
}

// 장바구니 클릭 이벤트
function cartBtnEventListener() {
    const $cartBtn = document.querySelector(".cart-btn");

    if ($cartBtn) {
        $cartBtn.addEventListener("click", isCartItems);
    }
}

// 장바구니에 해당 상품 있는지 확인
async function isCartItems() {
    const cartData = await fetchCartList();
    const productId = cartData.map((item) => item.product.id);

    if (productId.includes(currentProduct.id)) {
        notAddProductModal();
    } else {
        addCartItems(currentProduct.id, productQuantity);
        addCartConfirm();
    }
}

// 장바구니에 상품 추가했을 때의 알림창
function addCartConfirm() {
    if (
        confirm(
            `장바구니에 상품이 추가 되었습니다.\n장바구니로 이동하시겠습니까?`
        )
    ) {
        location.href = `./cart.html`;
    }
}

// 이미 장바구니에 담긴 상품을 다시 담으려고 할 때 모달 띄우는 함수
function notAddProductModal() {
    $toCartModal.innerHTML = renderToCartModal();
    $toCartModal.showModal();
    $toCartModal.style.display = "flex";
    toCartOrCancel();
}

// 장바구니 이동 여부 선택 함수
function toCartOrCancel() {
    const $close = document.querySelector(".to-cart-modal__close");
    const $cancel = document.querySelector(".to-cart-modal__cancel");
    const $confirm = document.querySelector(".to-cart-modal__confirm");

    if ($close) {
        $close.addEventListener("click", () => {
            $toCartModal.close();
            $toCartModal.style.display = "none";
        });
    }

    if ($cancel) {
        $cancel.addEventListener("click", () => {
            $toCartModal.close();
            $toCartModal.style.display = "none";
        });
    }

    if ($confirm) {
        $confirm.addEventListener("click", () => {
            location.href = `./cart.html`;
        });
    }
}

export { loadProductDetail, quantityBtnEventListener, cartBtnEventListener };

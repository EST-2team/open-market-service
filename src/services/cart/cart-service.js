import { getCartData } from "./cart-list-api.js";
import { renderCartItem } from "../../components/cart/cart-item.js";
import { quantityModal } from "../../components/cart/quantity-modal.js";

function decreaseQuantity() {
    const quantityInput = document.querySelector(".cart__modal-quantity");

    const currentValue = parseInt(quantityInput.value) || 1;

    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.querySelector(".cart__modal-quantity");
    const currentValue = parseInt(quantityInput.value) || 1;
    quantityInput.value = currentValue + 1;
}

function quantityUpdate(itemId) {
    const cartData = getCartData();
    const item = cartData.find((item) => item.id === itemId);
    item.quantity = document.querySelector(".cart__modal-quantity").value;
    renderCartItem(cartData);

    closeModal();
}

function closeModal() {
    const $cartModal = document.querySelector(".cart__modal");
    $cartModal.innerHTML = "";
}

function initCartModalListener() {
    const $cartTableSection = document.querySelector(".cart__table-section");
    if (!$cartTableSection) {
        console.error("cart__table-section 요소를 찾을 수 없습니다.");
        return;
    }

    $cartTableSection.addEventListener("click", (e) => {
        // 수량 모달 버튼 클릭 (장바구니 목록에서)
        if (e.target.classList.contains("quantity-modal__btn")) {
            const $cartModal = document.querySelector(".cart__modal");
            const itemId = parseInt(e.target.getAttribute("data-item-id"));

            $cartModal.innerHTML = "";
            $cartModal.innerHTML = quantityModal(itemId);
        }
        // 모달 내부 감소 버튼
        else if (e.target.classList.contains("cart__modal-quantity--minus")) {
            decreaseQuantity();
        }
        // 모달 내부 증가 버튼
        else if (e.target.classList.contains("cart__modal-quantity--plus")) {
            increaseQuantity();
        }
        // 모달 수량 수정 버튼
        else if (e.target.classList.contains("cart__modal-quantity--update")) {
            const itemId = parseInt(e.target.getAttribute("data-item-id"));
            quantityUpdate(itemId);
        }
    });
}

export { initCartModalListener };

import { deleteCartItem, fetchCartList, getCartData } from "./cart-api.js";
import { renderCartItem } from "../../components/cart/cart-item.js";
import { quantityModal } from "../../components/cart/quantity-modal.js";
import { deleteModal } from "../../components/cart/delete-modal.js";

function decreaseQuantity() {
    const $quantityInput = document.querySelector(".cart__modal-quantity");

    const currentValue = parseInt($quantityInput.value) || 1;

    if (currentValue > 1) {
        $quantityInput.value = currentValue - 1;
    }

    const plus = document.querySelector(".cart__modal-quantity--plus");

    if (plus.disabled) {
        plus.disabled = false;
        return;
    }
}

function increaseQuantity() {
    const $quantityInput = document.querySelector(".cart__modal-quantity");
    const currentValue = parseInt($quantityInput.value) || 0;

    $quantityInput.value = currentValue + 1;
}

function plusBtnDisabled(itemId, currentValue) {
    const cartData = getCartData();
    const item = cartData.find((item) => item.id === itemId);

    if (item.product.stock <= currentValue) {
        const plus = document.querySelector(".cart__modal-quantity--plus");
        plus.disabled = true;
        return;
    }
}

function quantityUpdate(itemId) {
    const cartData = getCartData();
    const item = cartData.find((item) => item.id === itemId);

    const $quantityInput = document.querySelector(".cart__modal-quantity");
    if (!$quantityInput.value) {
        alert("변경하실 수량을 입력하세요");
        return;
    }

    const currentValue = parseInt($quantityInput.value);
    if (item.product.stock < currentValue) {
        alert(
            `재고가 부족합니다. 최대 주문 가능 수량은 ${item.product.stock}개입니다.`
        );
        return;
    }

    item.quantity = document.querySelector(".cart__modal-quantity").value;

    renderCartItem(cartData);
    closeModal();
}

function closeModal() {
    const $cartModal = document.querySelector(".cart__modal");
    $cartModal.innerHTML = "";
}

function deleteCartItemService(itemId) {
    const $cartModal = document.querySelector(".cart__modal");
    $cartModal.innerHTML = deleteModal(itemId);
}

function initCartModalListener() {
    const $cartTableSection = document.querySelector(".cart__table-section");
    if (!$cartTableSection) {
        console.error("cart__table-section 요소를 찾을 수 없습니다.");
        return;
    }

    $cartTableSection.addEventListener("click", async (e) => {
        const itemId = parseInt(e.target.getAttribute("data-item-id"));

        // 수량 모달 버튼 클릭 (장바구니 목록에서)
        if (e.target.classList.contains("quantity-modal__btn")) {
            const $cartModal = document.querySelector(".cart__modal");
            $cartModal.innerHTML = "";
            $cartModal.innerHTML = quantityModal(itemId);

            const $quantityInput = document.querySelector(
                ".cart__modal-quantity"
            );
            const currentValue = parseInt($quantityInput.value) || 0;
            plusBtnDisabled(itemId, currentValue);
        }
        // 모달 내부 감소 버튼
        else if (e.target.classList.contains("cart__modal-quantity--minus")) {
            decreaseQuantity();
        }
        // 모달 내부 증가 버튼
        else if (e.target.classList.contains("cart__modal-quantity--plus")) {
            increaseQuantity();

            const $quantityInput = document.querySelector(
                ".cart__modal-quantity"
            );
            const currentValue = parseInt($quantityInput.value) || 0;
            plusBtnDisabled(itemId, currentValue);
        }
        // 모달 수량 수정 버튼
        else if (e.target.classList.contains("cart__modal-quantity--update")) {
            quantityUpdate(itemId);
        }
        // 취소
        else if (
            e.target.classList.contains("cart__modal--cancel") ||
            e.target.classList.contains("cart__modal-quantity--cancel") ||
            e.target.classList.contains("cart__modal-delete--cancel")
        ) {
            closeModal();
        }
        // 삭제 버튼
        else if (e.target.classList.contains("cart__delete-btn")) {
            deleteCartItemService(itemId);
        }
        // 삭제 확인
        else if (e.target.classList.contains("cart__modal-delete--update")) {
            const itemId = parseInt(e.target.getAttribute("data-item-id"));
            await deleteCartItem(itemId);
            await fetchCartList();
            closeModal();
        }
    });
}

export { initCartModalListener };

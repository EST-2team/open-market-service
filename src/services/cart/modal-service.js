import {
    deleteCartItem,
    fetchCartList,
    getCartData,
    updateCartItemQuantity,
} from "./cart-api.js";
import { renderCartItem } from "../../components/cart/cart-item.js";
import { renderQuantityModal } from "../../components/cart/quantity-modal.js";
import { renderDeleteModal } from "../../components/cart/delete-modal.js";
import { renderPaymentInfo } from "../../components/cart/payment-info.js";
import { checkedIds, updatePaymentInfo } from "./service.js";

function decreaseQuantity() {
    const $quantityInput = document.querySelector(".cart__modal-quantity");

    const currentValue = parseInt($quantityInput.value) || 1;

    if (currentValue > 1) {
        $quantityInput.value = currentValue - 1;
    }

    const plus = document.querySelector(".cart__modal-quantity--plus");

    if (plus.disabled) {
        plus.disabled = false;
        plus.style.cursor = "pointer";
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
        const $plus = document.querySelector(".cart__modal-quantity--plus");
        $plus.disabled = true;
        $plus.style.cursor = "not-allowed";
        return;
    }
}

async function quantityUpdate(itemId) {
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
    await updateCartItemQuantity(item);
    closeModal();
    await refreshRenderView();
}

function closeModal() {
    const $cartModal = document.querySelector(".cart__modal");
    $cartModal.innerHTML = "";

    const $overlay = document.querySelector(".cart__modal-overlay");
    $overlay.classList.remove("is-open");
}

function deleteCartItemService(itemId) {
    const $cartModal = document.querySelector(".cart__modal");
    $cartModal.innerHTML = renderDeleteModal(itemId);
}

async function refreshRenderView() {
    const checkedItemIds = checkedIds();

    const cartData = await fetchCartList();
    renderCartItem(cartData);

    const checkedItems = cartData.filter((item) =>
        checkedItemIds.includes(item.id)
    );

    //장바구니 목록 렌더링 후 이전 체크된 data-item-id 값을 이용해서 다시 checked=true로 상태변경
    const $checkbox = document.querySelectorAll(".cart__checkbox");
    Array.from($checkbox)
        .filter((item) =>
            checkedItemIds.includes(parseInt(item.getAttribute("data-item-id")))
        )
        .forEach((item) => (item.checked = true));
    renderPaymentInfo(checkedItems);
}

function initCartModalListener() {
    const $cartTableSection = document.querySelector(".cart__table-section");
    const $modalOverlay = document.querySelector(".cart__modal-overlay");
    if (!$cartTableSection) {
        console.error("cart__table-section 요소를 찾을 수 없습니다.");
        return;
    }

    //모달 열리는 트리거
    $cartTableSection.addEventListener("click", async (e) => {
        const itemId = parseInt(e.target.getAttribute("data-item-id"));

        // 수량 모달 버튼 클릭 (장바구니 목록에서)
        if (e.target.classList.contains("quantity-modal__btn")) {
            const $cartModal = document.querySelector(".cart__modal");
            $cartModal.innerHTML = renderQuantityModal(itemId);

            const $overlay = document.querySelector(".cart__modal-overlay");
            $overlay.classList.add("is-open");

            const $quantityInput = document.querySelector(
                ".cart__modal-quantity"
            );
            const currentValue = parseInt($quantityInput.value) || 0;
            plusBtnDisabled(itemId, currentValue);
        }
        // 삭제 버튼
        else if (e.target.classList.contains("cart__delete-btn")) {
            deleteCartItemService(itemId);

            const $overlay = document.querySelector(".cart__modal-overlay");
            $overlay.classList.add("is-open");
        }
    });

    //모달 내부 컨트롤
    $modalOverlay.addEventListener("click", async (e) => {
        const itemId = parseInt(e.target.getAttribute("data-item-id"));

        // 모달 내부 감소 버튼
        if (e.target.classList.contains("cart__modal-quantity--minus")) {
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
            await quantityUpdate(itemId);
        }
        // 취소
        else if (
            e.target.classList.contains("cart__modal--cancel") ||
            e.target.classList.contains("cart__modal-quantity--cancel") ||
            e.target.classList.contains("cart__modal-delete--cancel")
        ) {
            closeModal();
        }
        // 삭제 확인
        else if (e.target.classList.contains("cart__modal-delete--update")) {
            const itemId = parseInt(e.target.getAttribute("data-item-id"));
            await deleteCartItem(itemId);
            closeModal();
            await refreshRenderView();
        }
    });
}

export { initCartModalListener };

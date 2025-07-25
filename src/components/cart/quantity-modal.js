import { getCartData } from "../../services/cart/cart-api.js";

function renderQuantityModal(itemId) {
    let cartData = getCartData();
    const item = cartData.find((item) => item.id === itemId);

    return `<div class="cart__modal--close">
                <button class="cart__modal--cancel" type="button" aria-label="창 닫기"></button>
            </div>
            <div class="cart__quantity-modal--control">
                <button class="cart__modal-quantity--minus" data-item-id="${item.id}" type="button" aria-label="${item.product.name} 수량 감소 버튼"></button>
                <input class="cart__modal-quantity" type="number" oninput="this.value = this.value.replace(/[^0-9]/g, ''); if(this.value < 1 || this.value === '') this.value = 1;" value="${item.quantity}" aria-label="현재 수량" />
                <button class="cart__modal-quantity--plus" data-item-id="${item.id}" type="button" aria-label="${item.product.name} 수량 증가 버튼"></button>
            </div>
            <div class="cart__modal-btn-group">
                <button class="cart__modal-quantity--cancel" type="button">취소</button>
                <button class="cart__modal-quantity--update" type="button" data-item-id="${item.id}">확인</button>
            </div>
           `;
}

export { renderQuantityModal };

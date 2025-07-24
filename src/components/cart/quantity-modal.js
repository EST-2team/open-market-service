import { getCartData } from "../../services/cart/cart-list-api.js";

function quantityModal(itemId) {
    let cartData = getCartData();
    const item = cartData.find((item) => item.id === itemId);
    console.log(item);

    return `<div class="cart__modal--close">
                <button onclick="closeModal()"><img src="../../assets/icons/icon-delete.svg" alt="창 닫기" /></button>
            </div>
            <div class="cart__quantity-modal--control">
                <button class="cart__modal-quantity--minus" data-item-id="${item.id}" type="button" aria-label="${item.product.name} 수량 감소 버튼"></button>
                <input class="cart__modal-quantity" value="${item.quantity}" aria-label="현재 수량" />
                <button class="cart__modal-quantity--plus" data-item-id="${item.id}" type="button" aria-label="${item.product.name} 수량 증가 버튼"></button>
            </div>
            <div class="modal__btn-group">
                <button onclick="closeModal()">취소</button>
                <button class="cart__modal-quantity--update" data-item-id="${item.id}">확인</button>
            </div>
           `;
}

export { quantityModal };

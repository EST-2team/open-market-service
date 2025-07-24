function deleteModal(itemId) {
    return `<div class="cart__modal--close">
                <button class="cart__modal--cancel" type="button" aria-label="창 닫기"></button>
            </div>
            <div class="cart__delete-modal-text">
                <span>상품을 삭제하시겠습니까?</span>
            </div>
            <div class="cart__modal-btn-group">
                <button class="cart__modal-delete--cancel" type="button">취소</button>
                <button class="cart__modal-delete--update" type="button" data-item-id="${itemId}">확인</button>
            </div>
           `;
}

export { deleteModal };

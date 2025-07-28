// 장바구니 이동 여부 모달 내용
function renderToCartModal() {
    return `<button class="to-cart-modal__close" type="button" aria-label="창 닫기"></button>
            <h3 class="to-cart-modal__title">이미 장바구니에 있는 상품입니다.<br />장바구니로 이동하시겠습니까?</h3>
            <div class="to-cart-modal__btns">
                <button class="to-cart-modal__cancel" type="button">아니오</button>
                <button class="to-cart-modal__confirm" type="button">예</button>
            </div>
           `;
}

export { renderToCartModal };

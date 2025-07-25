function renderPaymentInfo(items) {
    const totalPrice = items.reduce(
        (acc, cur) => acc + cur.product.price * cur.quantity,
        0
    );
    const shippingFee = items.reduce(
        (acc, cur) => acc + cur.product.shipping_fee,
        0
    );
    const discount = 0;

    const dl = document.querySelector(".cart__payment-info");
    dl.innerHTML = `<div class="cart__total-price">
                        <dt class="cart__label">총 상품금액</dt>
                        <dd class="cart__amount">${totalPrice.toLocaleString()}원</dd>
                    </div>
                    <div class="cart__discount">
                        <dt class="cart__label">상품 할인</dt>
                        <dd class="cart__amount"><span>${discount.toLocaleString()}</span>원</dd>
                    </div>
                    <div class="cart__delivery-fee">
                        <dt class="cart__label">배송비</dt>
                        <dd class="cart__amount"><span>${shippingFee.toLocaleString()}</span>원</dd>
                    </div>
                    <div class="cart__final-amount">
                        <dt class="cart__label cart__label--bold">
                            결제 예정 금액
                        </dt>
                        <dd class="cart__amount cart__amount--final"><span>${(totalPrice - discount + shippingFee).toLocaleString()}</span>원</dd>
                    </div>`;
}

export { renderPaymentInfo };

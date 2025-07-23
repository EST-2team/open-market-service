const $cartList = document.querySelector(".cart__list");

function renderCartItem(items) {
    if (items.length === 0) {
        $cartList.innerHTML = `<tr>
                                   <td colspan="5">
                                       <p>장바구니에 담긴 상품이 없습니다.</p>
                                       <p>원하는 상품을 장바구니에 담아보세요!</p>
                                   </td>
                               </tr>`;
        return;
    }

    $cartList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
        const checkboxId = `cart-item-${item.id}`;
        const tr = document.createElement("tr");
        tr.classList.add("cart__item");

        tr.innerHTML = `<td class="cart__checkbox-cell">
                            <label class="sr-only" for="${checkboxId}">${item.product.name} 선택</label>
                            <input type="checkbox" id="${checkboxId}">
                        </td>
                        <td class="cart__product-cell">
                            <div class="cart__product-image-container">
                                <img src="${item.product.image}" alt="${item.product.name}">
                            </div>
                            <div class="cart__product-info">
                                <p class="cart__product-seller">
                                    <span class="sr-only">판매점: </span>${item.product.seller.store_name}
                                </p>
                                <h4 class="cart__product-name">${item.product.name}</h4>
                                <p class="cart__product-price">
                                    <span class="sr-only">가격: </span>${item.product.price.toLocaleString()}원
                                </p>
                                <p class="cart__delivery-info">
                                    <span class="sr-only">배송: </span>${item.product.shipping_method} / ${item.product.shipping_fee || "무료배송"}
                                </p>
                            </div>
                        </td>
                        <td class="cart__product-amount-cell">
                            <div class="cart__amount-container">
                                <button class="cart__amount--minus" type="button" aria-label="${item.product.name} 수량 감소 버튼"></button>
                                <span class="cart__amount" aria-label="현재 수량">${item.quantity}</span>
                                <button class="cart__amount--plus" type="button" aria-label="${item.product.name} 수량 증가 버튼"></button>
                            </div>
                        </td>
                        <td class="cart__product-price-cell">
                            <div>
                                 <p class="cart__total-price">
                                    <span class="sr-only">상품 금액: </span>
                                    ${(item.product.price * item.quantity).toLocaleString()}원
                                </p>

                                <button class="cart__payment-btn" type="button" onclick="orderItem([${item.id}])">주문하기</button>
                            </div>
                        </td>
                        <td class="cart__delete-cell">
                            <button type="button" class="cart__delete-btn" aria-label="상품 삭제"><img src="../../assets/icons/icon-delete.svg" alt=""></button>
                        </td>
                        `;

        fragment.appendChild(tr);
    });

    $cartList.appendChild(fragment);
}

export { renderCartItem };

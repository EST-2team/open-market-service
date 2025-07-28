function renderOrderItem(items) {
    const $orderList = document.querySelector(".order__list");
    const fragment = document.createDocumentFragment();

    items.orderItems.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="order__product-info">
                            <img
                                class="order__product-img"
                                src="${item.product.image}"
                                alt="${item.product.name} 상품 이미지"
                            />
                            <h4 class="order__product-seller">
                                ${item.product.seller.store_name}
                            </h4>
                            <p class="order__product-name">
                                ${item.product.name}
                            </p>
                            <p class="order__product-quantity">
                                수량 : ${item.quantity.toLocaleString()}개
                            </p>
                        </td>
                        <td class="order__product-discount">
                            <span aria-hidden="true">-</span>
                        </td>
                        <td class="order__product-fee">
                            <span>${item.product.shipping_fee.toLocaleString() + "원" || "무료배송"}</span>
                        </td>
                        <td class="order__product-price">${(item.quantity * item.product.price).toLocaleString()}원</td>`;
        fragment.appendChild(tr);
    });

    $orderList.appendChild(fragment);
}

export { renderOrderItem };

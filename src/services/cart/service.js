function singleOrder(itemId) {
    const orderPageUrl = `../../pages/order/order.html`;
    const queryParams = `?order_type=cart_order&product_list=${itemId}`;
    window.location.href = orderPageUrl + queryParams;
}

function initCartListener() {
    const $cart = document.querySelector(".cart");

    $cart.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart__payment-btn--single")) {
            const itemId = e.target.getAttribute("data-item-id");
            singleOrder(itemId);
        }
    });
}

export { initCartListener };

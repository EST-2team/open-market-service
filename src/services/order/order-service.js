import { createOrder } from "./order-api.js";
import { fetchCartList } from "../cart/cart-api.js";
import { renderOrderItem } from "../../components/order/order-item.js";

let orderData = [];

//주문 목록 조회 로직
async function getOrderItems() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderType = urlParams.get("order_type");
    const productList = urlParams.get("product_list");

    const cartData = await fetchCartList();
    const orderItems = cartData.filter((item) => productList.includes(item.id));
    return { orderType, orderItems };
}
async function renderOrderItems() {
    orderData = await getOrderItems();
    renderOrderItem(orderData);
}
function renderOrderTotalPrice() {
    const totalPrice = orderData.orderItems.reduce(
        (acc, cur) => acc + cur.quantity * cur.product.price,
        0
    );
    const $totalPrice = document.querySelector(".order__total-price");
    $totalPrice.innerText = `${totalPrice.toLocaleString()}원`;
}

//배송정보 검증로직
//우편번호 조회

//결제수단 검증로직

//최종결제 로직

async function initOrderListener() {
    await renderOrderItems();
    renderOrderTotalPrice();
}

export { initOrderListener };

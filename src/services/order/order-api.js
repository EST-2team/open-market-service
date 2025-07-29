import { customFetch } from "../../utils/customFetch.js";

async function createOrder(order) {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const url = `https://api.wenivops.co.kr/services/open-market/order/`;
        let body;
        if (order.orderType === "cart_order") {
            body = JSON.stringify({
                order_type: order.orderType,
                cart_items: order.cartItems,
                total_price: order.totalPrice,
                receiver: order.receiver,
                receiver_phone_number: order.receiverPhoneNumber,
                address: order.address,
                delivery_message: order.deliveryMessage,
                payment_method: order.paymentMethod,
            });
        } else if (order.orderType === "direct_order") {
            body = JSON.stringify({
                order_type: order.orderType,
                product: order.product,
                quantity: order.quantity,
                total_price: order.totalPrice,
                receiver: order.receiver,
                receiver_phone_number: order.receiverPhoneNumber,
                address: order.address,
                delivery_message: order.deliveryMessage,
                payment_method: order.paymentMethod,
            });
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: body,
        };
        const res = await customFetch(url, options);

        if (!res.ok) {
            const error = await res.json();
            console.error(error);
            throw new Error("주문 생성 중 오류가 발생하였습니다.");
        }

        location.replace("./product-list.html");
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

export { createOrder };

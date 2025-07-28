async function createOrder(order) {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const url = `https://api.wenivops.co.kr/services/open-market/order/`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                order_type: order.orderType,
                cart_items: order.cartItems,
                total_price: order.totalPrice,
                receiver: order.receiver,
                receiver_phone_number: order.receiverPhoneNumber,
                address: order.address,
                address_message: order.addressMessage,
                payment_method: order.paymentMethod,
            }),
        };
        const res = await fetch(url, options);

        if (!res.ok) {
            const error = await res.json();
            console.error(error);
            throw new Error("주문 생성 중 오류가 발생하였습니다.");
        }

        location.replace("/src/pages/product-list.html");
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

export { createOrder };

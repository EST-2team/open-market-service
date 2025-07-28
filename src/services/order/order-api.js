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
                reciever: order.reciever,
                reciever_phone_number: order.receiverPhoneNumber,
                address: order.address,
                address_message: order.message,
                payment_method: order.paymentMethod,
            }),
        };
        const res = await fetch(url, options);
        console.log(res);

        if (!res.ok) {
            throw new Error("주문 생성 중 오류가 발생하였습니다.");
        }
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

export { createOrder };

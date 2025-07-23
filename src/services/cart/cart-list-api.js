import { renderCartItem } from "../../components/cart/cart-item.js";

let cartData = [];

const fetchCartList = async () => {
    try {
        const accessToken = localStorage.getItem("access");

        const url = "https://api.wenivops.co.kr/services/open-market/cart";
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error("장바구니 목록 조회 중 오류가 발생하였습니다.");
        }

        const data = await res.json();
        cartData = data.results;

        renderCartItem(cartData);
    } catch (error) {
        console.error(error);
        alert(error);
    }
};

const getCartData = () => cartData;

export { fetchCartList, getCartData };

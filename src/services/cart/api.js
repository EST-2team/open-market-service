import { renderCartItem } from "../../components/cart/cart-item.js";

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
        renderCartItem(data.results);
    } catch (error) {
        console.error(error);
        alert(error);
    }
};

export { fetchCartList };

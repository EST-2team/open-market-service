import { renderCartItem } from "../../components/cart/cart-item.js";

let cartData = [];

async function fetchCartList() {
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
}

async function deleteCartItem(itemId) {
    try {
        const accessToken = localStorage.getItem("access");

        const url = `https://api.wenivops.co.kr/services/open-market/cart/${itemId}`;
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error("장바구니 상품 삭제 중 오류가 발생하였습니다.");
        }

        alert("장바구니에 담긴 상품이 삭제되었습니다.");
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

const getCartData = () => cartData;

export { fetchCartList, getCartData, deleteCartItem };

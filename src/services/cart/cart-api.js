let cartData = [];

async function fetchCartList() {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const url = "https://api.wenivops.co.kr/services/open-market/cart/";
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error("장바구니 목록 조회 중 오류가 발생하였습니다.");
        }

        const data = await res.json();
        cartData = data.results;

        return cartData;
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

async function deleteCartItem(itemId) {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const url = `https://api.wenivops.co.kr/services/open-market/cart/${itemId}/`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
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

async function updateCartItemQuantity(item) {
    try {
        const accessToken = localStorage.getItem("accessToken");

        const url = `https://api.wenivops.co.kr/services/open-market/cart/${item.id}/`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                quantity: parseInt(item.quantity, 10),
            }),
        };
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(
                "장바구니 상품의 수량 수정 중 오류가 발생하였습니다."
            );
        }
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

const getCartData = () => cartData;

export { fetchCartList, getCartData, deleteCartItem, updateCartItemQuantity };

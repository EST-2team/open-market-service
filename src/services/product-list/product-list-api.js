import { renderProduct } from "../../components/project-list/product-list.js";

let productData = [];

async function getProduct() {
    try {
        const marketUrl =
            "https://api.wenivops.co.kr/services/open-market/products";
        const res = await fetch(marketUrl, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        productData = data.results;

        renderProduct(productData);
    } catch (error) {
        console.log("상품 불러오기 실패:", error.message);
        alert("상품을 불러오지 못했습니다.");
    }
}

export { productData, getProduct };

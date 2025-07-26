import { renderProduct } from "../../components/product-list/product-list.js";

let productData = [];

const marketProductsUrl =
    "https://api.wenivops.co.kr/services/open-market/products/";

// 상품 데이터 모두 가져오기
async function getProduct() {
    try {
        const res = await fetch(marketProductsUrl, {
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

// 선택한 상품의 id값에 해당하는 상세 데이터 가져오기
async function fetchProductById(id) {
    try {
        const res = await fetch(`${marketProductsUrl}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(`ID:${id} 상품 불러오기 실패:`, error);
        return null;
    }
}

export { marketProductsUrl, getProduct, fetchProductById };

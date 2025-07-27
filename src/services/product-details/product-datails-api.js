import { marketProductsUrl } from "../product-list/product-list-api.js";

// 선택한 상품의 id값에 해당하는 상세 데이터 가져오기
async function fetchProductById(id) {
    try {
        const res = await fetch(`${marketProductsUrl}${id}/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(`ID:${id} 상품 불러오기 실패:`, error);
        return null;
    }
}

export { fetchProductById };

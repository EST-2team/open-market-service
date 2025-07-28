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

        return productData;
    } catch (error) {
        console.log("상품 불러오기 실패:", error.message);
        alert("상품을 불러오지 못했습니다.");
        return null;
    }
}

export { marketProductsUrl, getProduct };

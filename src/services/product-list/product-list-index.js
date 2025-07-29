import { getProduct } from "./product-list-api.js";
import { renderProduct } from "../../components/product-list/product-list.js";

document.addEventListener("DOMContentLoaded", async () => {
    const productData = await getProduct();
    renderProduct(productData);
});

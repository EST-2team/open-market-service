import { getProduct } from "./product-list-api.js";
import { renderProduct } from "../../components/product-list/product-list.js";
import {
    renderBanner,
    intervalBanner,
} from "../../components/product-list/product-banner.js";

document.addEventListener("DOMContentLoaded", async () => {
    const productData = await getProduct();
    renderProduct(productData);
    renderBanner(productData);
    intervalBanner();
});

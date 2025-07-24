import { getProduct } from "./product-list-api.js";

document.addEventListener("DOMContentLoaded", async () => {
    await getProduct();
});

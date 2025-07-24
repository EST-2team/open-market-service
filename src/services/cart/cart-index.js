import { fetchCartList } from "./cart-list-api.js";

document.addEventListener("DOMContentLoaded", async () => {
    await fetchCartList();
});

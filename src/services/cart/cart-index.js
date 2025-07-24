import { fetchCartList } from "./cart-list-api.js";
import { initCartModalListener } from "./cart-service.js";

document.addEventListener("DOMContentLoaded", async () => {
    await fetchCartList();
    initCartModalListener();
});

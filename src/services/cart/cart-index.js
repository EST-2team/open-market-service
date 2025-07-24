import { fetchCartList } from "./cart-list-api.js";
import { initCartModalListener } from "./modal-service.js";

document.addEventListener("DOMContentLoaded", async () => {
    await fetchCartList();
    initCartModalListener();
});

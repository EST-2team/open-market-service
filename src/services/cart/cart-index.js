import { fetchCartList } from "./cart-api.js";
import { initCartModalListener } from "./modal-service.js";
import { initCartListener } from "./service.js";
document.addEventListener("DOMContentLoaded", async () => {
    await fetchCartList();

    initCartListener();
    initCartModalListener();
});

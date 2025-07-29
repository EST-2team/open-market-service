import { fetchCartList } from "./cart-api.js";
import { initCartModalListener } from "./modal-service.js";
import { initCartListener } from "./service.js";
import { renderCartItem } from "../../components/cart/cart-item.js";
document.addEventListener("DOMContentLoaded", async () => {
    const cartData = await fetchCartList();
    renderCartItem(cartData);

    initCartListener();
    initCartModalListener();
});

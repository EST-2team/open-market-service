import { fetchCartList } from "./api.js";
document.addEventListener("DOMContentLoaded", async () => {
    await fetchCartList();
});

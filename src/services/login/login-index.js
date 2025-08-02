import { login, getRefreshToken } from "./login-api.js";

const tabButtons = document.querySelectorAll(".tab-btn");
const buyerForm = document.querySelector("#buyer-form");
const sellerForm = document.querySelector("#seller-form");

// 구매자 판매자 탭
tabButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const type = btn.dataset.type;

        if (type === "buyer") {
            buyerForm.classList.remove("hidden");
            sellerForm.classList.add("hidden");
        } else {
            buyerForm.classList.add("hidden");
            sellerForm.classList.remove("hidden");
        }
    })
);

// 구매자 로그인
document.querySelector("#buyer-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    await login({ username, password });

    console.log("로그인 후 refreshToken:", getRefreshToken());
});

// 판매자 로그인
document.querySelector("#seller-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    await login({ username, password });
    console.log("로그인 후 refreshToken:", getRefreshToken());
});

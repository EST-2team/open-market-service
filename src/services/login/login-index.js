import { login } from "./login-api.js";

const tabButtons = document.querySelectorAll(".tab-btn");
const buyerForm = document.querySelector("#buyer-form");
const sellerForm = document.querySelector("#seller-form");

const setupLoginForm = (form) => {
    const usernameInput = form.querySelector('input[type="text"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const errorSpan = form.querySelector(".login-error");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        errorSpan.innerText = "";

        if (!username) {
            errorSpan.innerText = "아이디를 입력해야 합니다.";
            usernameInput.focus();
            return;
        }

        if (!password) {
            errorSpan.innerText = "비밀번호를 입력해야 합니다.";
            passwordInput.focus();
            return;
        }

        const result = await login({ username, password });

        if (!result?.success) {
            errorSpan.innerText = result?.error || "로그인 실패";
            passwordInput.value = "";
            passwordInput.focus();
            return;
        }

        // 로그인 성공 시 이전 페이지 또는 기본 페이지로 이동
        const previousPage = document.referrer;
        if (previousPage && !previousPage.includes("login.html")) {
            window.location.href = previousPage;
        } else {
            window.location.href = "../../pages/product-list.html";
        }
    });

    [usernameInput, passwordInput].forEach((input) => {
        input.addEventListener("input", () => {
            errorSpan.innerText = "";
        });
    });
};

// 구매자/판매자 폼 각각에 기능 연결
setupLoginForm(buyerForm);
setupLoginForm(sellerForm);

// 탭 전환
tabButtons.forEach((btn) => {
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
    });
});

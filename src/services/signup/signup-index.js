import { validateUsername } from "./signup-validate-username-api.js";

document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.querySelector("#username");
    const checkbtn = document.querySelector(
        ".signup-form__button.signup-form__button--id-check"
    );
    const checkMsg = document.querySelector("#userid-check-msg");

    // 중복확인 버튼 이벤트 리스너
    checkbtn.addEventListener("click", async () => {
        const username = usernameInput.value.trim();

        if (!username) {
            checkMsg.innerHTML = "아이디를 입력하세요.";
            checkMsg.style.color = "red";
            return;
        }
        const result = await validateUsername(username);
        if (!result.valid) {
            checkMsg.innerHTML = result.message; // "이미 사용중인 아이디입니다. 등 출력"
            checkMsg.style.color = "red";
            return;
        }

        checkMsg.innerHTML = "사용 가능한 아이디입니다.";
        checkMsg.style.color = "green";
    });
});

import { validateUsername } from "./signup-validate-username-api.js";

// 아이디 중복확인
export function duplicateUsername() {
    const usernameInput = document.querySelector("#username");
    const checkbtn = document.querySelector(".signup-form__button--id-check");
    const checkMsg = document.querySelector("#userid-check-msg");

    checkbtn.addEventListener("click", async () => {
        const username = usernameInput.value.trim();

        if (!username) {
            checkMsg.textContent = "아이디를 입력하세요.";
            checkMsg.style.color = "red";
            return;
        }
        const result = await validateUsername(username);
        if (!result.valid) {
            checkMsg.textContent = result.message; // "이미 사용중인 아이디입니다. 등 출력"
            checkMsg.style.color = "red";
            return;
        }

        checkMsg.textContent = "사용 가능한 아이디입니다.";
        checkMsg.style.color = "green";
    });
}

// 이름 유효성 검사
export function validateName() {
    const nameInput = document.querySelector("#name");
    const nameMsg = document.querySelector("#name-msg");

    if (!nameInput.value.trim()) {
        nameMsg.textContent = "이름을 입력하세요.";
        nameMsg.style.color = "red";
        return false;
    }

    nameMsg.textContent = "";
    return true;
}

// 비밀번호 유효성 검사
export function validatePassword() {
    const passwordInput = document.querySelector("#password");
    const passwordMsg = document.querySelector("#password-msg");

    const password = passwordInput.value;

    if (password.length < 8) {
        passwordMsg.textContent = "비밀번호는 8자 이상이어야 합니다.";
        passwordMsg.style.color = "red";
        return false;
    }

    if (!/[a-z]/.test(password)) {
        passwordMsg.textContent =
            "비밀번호는 한 개 이상의 영소문자를 포함해야 합니다.";
        passwordMsg.style.color = "red";
        return false;
    }

    if (!/[0-9]/.test(password)) {
        passwordMsg.textContent =
            "비밀번호는 한 개 이상의 숫자를 포함해야 합니다.";
        passwordMsg.style.color = "red";
        return false;
    }

    passwordMsg.textContent = "";
    return true;
}

// 비밀번호 재확인
export function passwordMatch() {
    const password = document.querySelector("#password").value;
    const passwordCheck = document.querySelector("#passwordCheck").value;
    const passwordCheckMsg = document.querySelector("#passwordCheck-msg");

    if (password !== passwordCheck) {
        passwordCheckMsg.textContent = "비밀번호가 일치하지 않습니다.";
        passwordCheckMsg.style.color = "red";
        return false;
    }

    passwordCheckMsg.textContent = "비밀번호가 일치합니다.";
    passwordCheckMsg.style.color = "green";
    return true;
}

// 전화번호
export function phoneNumberMatch() {
    const midPhoneNum = document.querySelector("#mobile2");
    const lastPhoneNum = document.querySelector("#mobile3");
    const mobileMsg = document.querySelector("#mobile3-msg");

    const midVal = midPhoneNum.value.trim();
    const lastVal = lastPhoneNum.value.trim();

    let isValid = true;

    if (!midVal) {
        mobileMsg.textContent = "전화번호를 입력하세요.";
        mobileMsg.style.color = "red";
        isValid = false;
    } else if (midVal.length < 3) {
        mobileMsg.textContent = "전화번호 길이가 올바르지 않습니다.";
        mobileMsg.style.color = "red";
        isValid = false;
    } else if (!lastVal) {
        mobileMsg.textContent = "전화번호를 입력하세요.";
        mobileMsg.style.color = "red";
        isValid = false;
    } else if (lastVal.length < 4) {
        mobileMsg.textContent = "전화번호 길이가 올바르지 않습니다.";
        mobileMsg.style.color = "red";
        isValid = false;
    } else {
        mobileMsg.textContent = "";
    }

    return isValid;
}

// 약관동의
export function agreeCheck() {
    const agree = document.querySelector("#agree");
    const agreeMsg = document.querySelector("#agree-msg");

    if (!agree.checked) {
        agreeMsg.textContent = "이용약관에 동의해야 합니다.";
        agreeMsg.style.color = "red";
        return false;
    }
    if (agreeMsg) agreeMsg.textContent = "";
    return true;
}

// 폼 유효성 검사 통합
export function setupFormValidation() {
    const signupForm = document.querySelector("#signup-form");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isPasswordValid = validatePassword();
        const isPasswordMatch = passwordMatch();
        const isPhoneNumberMatch = phoneNumberMatch();
        const isAgreeChecked = agreeCheck();

        if (
            isNameValid &&
            isPasswordValid &&
            isPasswordMatch &&
            isPhoneNumberMatch &&
            isAgreeChecked
        ) {
            signupForm.submit(); // 모든 유효성 검사 통과 시 제출
        }
    });
}

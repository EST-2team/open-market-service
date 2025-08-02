import { signup } from "./signup-api.js";
import { validateUsername } from "./signup-api.js";
import { login } from "../login/login-api.js";

// 각 필드별 에러 메시지 출력 함수
function showErrorMessage(selector, message) {
    const el = document.querySelector(selector);
    if (el) {
        el.textContent = message;
        el.style.color = "red";
    }
}

function clearErrorMessages() {
    showErrorMessage("#userid-check-msg", "");
    showErrorMessage("#password-msg", "");
    showErrorMessage("#name-msg", "");
    showErrorMessage("#mobile3-msg", "");
}

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
        checkMsg.style.color = "#21BF48";
    });
}

export function validateUsernameInput() {
    const usernameInput = document.querySelector("#username");
    const checkMsg = document.querySelector("#userid-check-msg");

    const username = usernameInput.value.trim();
    if (!username) {
        checkMsg.textContent = "아이디를 입력하세요.";
        checkMsg.style.color = "red";
        return false;
    }
    const usernameRegex = /^[a-zA-Z0-9]{1,20}$/;
    if (!usernameRegex.test(username)) {
        checkMsg.textContent =
            "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
        checkMsg.style.color = "red";
        return false;
    }

    checkMsg.textContent = "";
    return true;
}

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

export function validatePassword() {
    const passwordInput = document.querySelector("#password");
    const passwordMsg = document.querySelector("#password-msg");
    const passwordIcon = document.querySelector(".signup-form__input-icon");

    let isValid = true;
    const password = passwordInput.value;
    if (password.length < 8) {
        passwordMsg.textContent = "비밀번호는 8자 이상이어야 합니다.";
        passwordMsg.style.color = "red";
        isValid = false;
    } else if (!/[a-zA-Z]/.test(password)) {
        passwordMsg.textContent =
            "비밀번호는 한 개 이상의 영소문자를 포함해야 합니다.";
        passwordMsg.style.color = "red";
        isValid = false;
    } else if (!/[0-9]/.test(password)) {
        passwordMsg.textContent =
            "비밀번호는 한 개 이상의 숫자를 포함해야 합니다.";
        passwordMsg.style.color = "red";
        isValid = false;
    } else {
        passwordMsg.textContent = "";
        isValid = true;
    }
    if (isValid) {
        passwordIcon.src = "/src/assets/icons/icon-check-on.svg";
    } else {
        passwordIcon.src = "/src/assets/icons/icon-check-off.svg";
    }
    return isValid;
}

export function passwordMatch() {
    const password = document.querySelector("#password").value;
    const passwordCheck = document.querySelector("#passwordCheck").value;
    const passwordCheckMsg = document.querySelector("#passwordCheck-msg");
    const passwordCheckIcon = document.querySelector(".password-check-icon");

    if (!passwordCheck) {
        passwordCheckMsg.textContent = "";
        if (passwordCheckIcon) {
            passwordCheckIcon.src = "/src/assets/icons/icon-check-off.svg";
        }
        return false;
    }

    if (password !== passwordCheck) {
        passwordCheckMsg.textContent = "비밀번호가 일치하지 않습니다.";
        passwordCheckMsg.style.color = "red";
        if (passwordCheckIcon) {
            passwordCheckIcon.src = "/src/assets/icons/icon-check-off.svg";
        }
        return false;
    }

    passwordCheckMsg.textContent = "비밀번호가 일치합니다.";
    passwordCheckMsg.style.color = "#21BF48";
    if (passwordCheckIcon) {
        passwordCheckIcon.src = "/src/assets/icons/icon-check-on.svg"; // 성공 아이콘
    }
    return true;
}

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

export function setupFormValidation() {
    const signupForm = document.querySelector("#signup-form");
    const usernameInput = document.querySelector("#username");
    const passwordCheck = document.querySelector("#passwordCheck");
    const passwordInput = document.querySelector("#password");
    const nameInput = document.querySelector("#name");
    const mobile2Input = document.querySelector("#mobile2");
    const mobile3Input = document.querySelector("#mobile3");
    const agreeCheckbox = document.querySelector("#agree");
    const submitButton = document.querySelector(".signup-form__submit-button");

    // 포커스 잃으면 검증
    usernameInput.addEventListener("blur", validateUsernameInput);
    passwordCheck.addEventListener("blur", passwordMatch);
    passwordInput.addEventListener("blur", validatePassword);

    // 모든 유효성을 검사하는 함수
    function checkAllValid() {
        return (
            validateUsernameInput() &&
            validateName() &&
            validatePassword() &&
            passwordMatch() &&
            phoneNumberMatch() &&
            agreeCheck()
        );
    }

    // 버튼 활성화 토글 함수
    function toggleSubmitButton() {
        if (checkAllValid()) {
            submitButton.disabled = false;
            submitButton.classList.add("active");
        } else {
            submitButton.disabled = true;
            submitButton.classList.remove("active");
        }
    }

    // 각 input/change 이벤트에 유효성 검사 및 버튼 상태 토글 추가
    usernameInput.addEventListener("input", () => {
        validateUsernameInput();
        toggleSubmitButton();
    });
    nameInput.addEventListener("input", () => {
        validateName();
        toggleSubmitButton();
    });
    passwordInput.addEventListener("input", () => {
        validatePassword();
        passwordMatch();
        toggleSubmitButton();
    });
    passwordCheck.addEventListener("input", () => {
        passwordMatch();
        toggleSubmitButton();
    });
    mobile2Input.addEventListener("input", () => {
        phoneNumberMatch();
        toggleSubmitButton();
    });
    mobile3Input.addEventListener("input", () => {
        phoneNumberMatch();
        toggleSubmitButton();
    });
    agreeCheckbox.addEventListener("change", () => {
        agreeCheck();
        toggleSubmitButton();
    });

    // 초기 버튼 상태 설정
    toggleSubmitButton();

    // 폼 제출 이벤트
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const isValidateUsernameInput = validateUsernameInput();
        const isNameValid = validateName();
        const isPasswordValid = validatePassword();
        const isPasswordMatch = passwordMatch();
        const isPhoneNumberMatch = phoneNumberMatch();
        const isAgreeChecked = agreeCheck();

        if (
            !(
                isValidateUsernameInput &&
                isNameValid &&
                isPasswordValid &&
                isPasswordMatch &&
                isPhoneNumberMatch &&
                isAgreeChecked
            )
        )
            return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const name = nameInput.value.trim();
        const phone_number =
            document.querySelector("#mobile1").value.trim() +
            mobile2Input.value.trim() +
            mobile3Input.value.trim();

        // 서버 에러 메시지 초기화
        document.querySelector("#userid-check-msg").textContent = "";
        document.querySelector("#password-msg").textContent = "";
        document.querySelector("#name-msg").textContent = "";
        document.querySelector("#mobile3-msg").textContent = "";

        const result = await signup({ username, password, name, phone_number });

        if (result.success) {
            alert("회원가입이 완료되었습니다.");
            signupForm.submit();
            login();
            location.href = "/src/pages/product-list.html";
        } else if (result.error) {
            const error = result.error;

            if (error.username) {
                const el = document.querySelector("#userid-check-msg");
                el.textContent = error.username[0];
                el.style.color = "red";
            }
            if (error.password) {
                const el = document.querySelector("#password-msg");
                el.textContent = error.password[0];
                el.style.color = "red";
            }
            if (error.name) {
                const el = document.querySelector("#name-msg");
                el.textContent = error.name[0];
                el.style.color = "red";
            }
            if (error.phone_number) {
                const el = document.querySelector("#mobile3-msg");
                el.textContent = error.phone_number[0];
                el.style.color = "red";
            }
            if (error.network) {
                alert(error.network[0]);
            }
        } else {
            alert("알 수 없는 오류가 발생했습니다.");
        }
    });
}

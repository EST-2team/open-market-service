export const login = async ({ username, password }) => {
    try {
        const response = await fetch(
            "https://api.wenivops.co.kr/services/open-market/accounts/login/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            const loginError = document.querySelector(".login-error");
            loginError.innerText = errorData.error;
            return;
        }

        const data = await response.json();

        const { access, refresh, user } = data;

        // 로컬스토리지 토큰 저장
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userInfo", JSON.stringify(user));

        const previousPage = document.referrer;

        if (previousPage && !previousPage.includes("login.html")) {
            window.location.href = previousPage;
        } else {
            // 만약 이전 페이지 정보가 없거나 로그인 페이지였다면 기본 페이지로
            window.location.href = "/index.html";
        }
    } catch (err) {
        console.error("네트워크 오류:", err);
    }
};

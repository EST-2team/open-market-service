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

        // 로그인 성공시 아이템리스트 페이지로 이동 (임시-수정가능)
        // replace 사용하면 뒤로가기 불가능
        location.replace("../../pages/product-list.html");
    } catch (err) {
        console.error("네트워크 오류:", err);
    }
};

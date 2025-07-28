export function isTokenExpired(token) {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
}

export async function getValidAccessToken() {
    const token = localStorage.getItem("accessToken");

    if (isTokenExpired(token)) {
        const refresh = localStorage.getItem("refreshToken");
        const res = await fetch(
            "https://api.wenivops.co.kr/services/open-market/accounts/token/refresh/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
            }
        );

        if (!res.ok) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            localStorage.clear();
            location.href = "/src/pages/login/login.html";
            return null;
        }

        const data = await res.json();
        localStorage.setItem("accessToken", data.access);
        return data.access;
    }

    return token;
}

document.querySelector("#logout-btn").addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 되었습니다.");
    location.href = "/login.html"; // 로그인 페이지로 이동
});

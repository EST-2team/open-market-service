document.querySelector("#logout-btn").addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    alert("로그아웃 되었습니다.");
    location.href = "/src/pages/product-list.html";
});

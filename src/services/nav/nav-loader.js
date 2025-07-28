import { initSearch } from "/src/services/nav/search.js";

const navPlaceholder = document.querySelector(".nav-placeholder");

fetch("/src/pages/nav/header-nav.html")
    .then((res) => {
        if (!res.ok) throw new Error("nav.html 불러오기 실패");
        return res.text();
    })
    .then((html) => {
        navPlaceholder.innerHTML = html;
        initSearch();

        const userInfo = localStorage.getItem("userInfo");
        const userNav = navPlaceholder.querySelector(".login");

        if (userInfo && userNav) {
            const user = JSON.parse(userInfo);

            if (user.user_type === "SELLER") {
                userNav.innerHTML = `
          <div class="mypage">
            <a href="/src/pages/mypage.html" class="mypage-link" style= "cursor: pointer;">
              <img src="/src/assets/icons/seller-center-button.svg" alt="판매자 센터" class="seller-center" style="width: 168px; height: 54px"/>
            </a>
          </div>
        `;
            } else {
                userNav.innerHTML = `
          <div class="mypage">
            <a href="/src/pages/mypage.html" class="login-link">
              <span class="icon-user"></span>
              <span class="label" style="font-size: 12px; color: #767676;" >마이페이지</span>
            </a>
          </div>
        `;
            }
        }
    })
    .catch((err) => {
        navPlaceholder.innerHTML = "<p>네비게이션 로드 실패</p>";
        console.error(err);
    });

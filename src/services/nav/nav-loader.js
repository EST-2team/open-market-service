import { initSearch } from "/src/services/nav/search.js";
import { initUserDropdown } from "./nav-dropdown-toggle.js";

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
          <div class="user-dropdown">
            <button id="userToggle" class="user-icon" aria-haspopup="true" aria-expanded="false">
              <img src="/src/assets/icons/seller-center-button.svg" alt="판매자 센터" class="seller-center" style="width: 168px; height: 54px"/>
            </button>
            <div class="dropdown-menu hidden" role="menu" aria-label="사용자 메뉴">
              <a href="/src/pages/mypage.html" role="menuitem">내 정보</a>
              <button id="logout-btn" role="menuitem">로그아웃</button>
            </div>
          </div>
        `;
            } else {
                userNav.innerHTML = `
          <div class="user-dropdown">
            <button id="userToggle" class="user-icon" aria-haspopup="true" aria-expanded="false">
              <span class="icon-user"></span>
              <span class="label" style="font-size: 12px; color: #767676;">마이페이지</span>
            </button>
            <div class="dropdown-menu hidden" role="menu" aria-label="사용자 메뉴">
              <a href="/src/pages/mypage.html" role="menuitem">마이페이지</a>
              <button id="logout-btn" role="menuitem">로그아웃</button>
            </div>
          </div>
        `;
            }
        }

        initUserDropdown();
    })
    .catch((err) => {
        navPlaceholder.innerHTML = "<p>네비게이션 로드 실패</p>";
        console.error(err);
    });

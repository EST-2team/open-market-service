import { initSearch } from "/src/services/nav/search.js";

const navPlaceholder = document.querySelector(".nav-placeholder");

fetch("/src/pages/nav/header-nav.html")
    .then((res) => {
        if (!res.ok) throw new Error("nav.html 불러오기 실패");
        return res.text();
    })
    .then((html) => {
        navPlaceholder.innerHTML = html;
        initSearch(); // nav 삽입 완료 후 검색 초기화 함수 실행
    })
    .catch((err) => {
        navPlaceholder.innerHTML = "<p>네비게이션 로드 실패</p>";
        console.error(err);
    });

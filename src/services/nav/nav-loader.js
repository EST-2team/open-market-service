const navPlaceholder = document.querySelector(".nav-placeholder");

fetch("./nav/header-nav.html")
    .then((res) => {
        if (!res.ok) throw new Error("nav.html 불러오기 실패");
        return res.text();
    })
    .then((html) => {
        navPlaceholder.innerHTML = html;

        const script = document.createElement("script");
        script.src = "../services/nav/search.js";
        script.type = "module";
        document.body.appendChild(script);
    })
    .catch((err) => {
        navPlaceholder.innerHTML = "<p>네비게이션 로드 실패</p>";
        console.error(err);
    });

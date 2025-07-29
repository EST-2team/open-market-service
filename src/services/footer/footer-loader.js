const footer = document.querySelector(".footer");

fetch("/src/pages/footer.html")
    .then((res) => {
        if (!res.ok) throw new Error("footer.html 불러오기 실패");
        return res.text();
    })
    .then((html) => {
        footer.innerHTML = html;
    })
    .catch((err) => {
        footer.innerHTML = "<p>푸터 로드 실패</p>";
        console.error(err);
    });

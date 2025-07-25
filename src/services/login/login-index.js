const tabButtons = document.querySelectorAll(".tab-btn");
const buyerForm = document.querySelector("#buyer-form");
const sellerForm = document.querySelector("#seller-form");

tabButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const type = btn.dataset.type;

        if (type === "buyer") {
            buyerForm.classList.remove("hidden");
            sellerForm.classList.add("hidden");
        } else {
            buyerForm.classList.add("hidden");
            sellerForm.classList.remove("hidden");
        }
    })
);

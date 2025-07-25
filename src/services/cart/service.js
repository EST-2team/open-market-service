import { getCartData } from "./cart-api.js";
import { renderPaymentInfo } from "../../components/cart/payment-info.js";

function singleOrder(itemId) {
    const orderPageUrl = `../pages/order.html`;
    const queryParams = `?order_type=cart_order&product_list=${itemId}`;
    window.location.href = orderPageUrl + queryParams;
}

function multiOrder() {
    const checkedItems = document.querySelectorAll(".cart__checkbox:checked");
    if (checkedItems.length === 0) {
        alert("주문하실 상품을 체크해주세요.");
        return;
    }

    const itemIds = Array.from(checkedItems).map((item) =>
        item.getAttribute("data-item-id")
    );

    const orderPageUrl = `../pages/order.html`;
    const queryParams = `?order_type=cart_order&product_list=${itemIds.join(",")}`;
    window.location.href = orderPageUrl + queryParams;
}

function handleSelectAll(checkboxAll) {
    const checkedItems = document.querySelectorAll(".cart__checkbox");
    checkedItems.forEach((checkbox) => {
        checkbox.checked = checkboxAll.checked;
    });

    if (checkboxAll.checked) {
        renderPaymentInfo(getCartData()); //결제 정보에 모든 상품 포함
    } else {
        renderPaymentInfo([]); //결제 정보 모든 상품 제외
    }
}

function checkedIds() {
    const checkedCheckboxes = document.querySelectorAll(
        ".cart__checkbox:checked"
    );
    const checkedItemIds = Array.from(checkedCheckboxes)
        .map((checkbox) => checkbox.getAttribute("data-item-id"))
        .map((id) => parseInt(id));
    return checkedItemIds;
}

//결제 정보 업데이트
function updatePaymentInfo() {
    const allCartData = getCartData();
    const checkedItemIds = checkedIds();
    const selectedItems = allCartData.filter((item) =>
        checkedItemIds.includes(item.id)
    );

    renderPaymentInfo(selectedItems);
}

function initCartListener() {
    const $cart = document.querySelector(".cart");
    const $checkboxAll = document.querySelector(".cart__checkbox-all");
    const $checkbox = document.querySelectorAll(".cart__checkbox");

    //첫 렌더링시 모든 체크박스 활성화
    $checkboxAll.checked = true; //전체 선택 체크박스 활성화
    $checkbox.forEach((checkbox) => {
        checkbox.checked = true; //하위 체크박스 모두 활성화화
    });

    updatePaymentInfo();

    $checkboxAll.addEventListener("change", (e) => {
        handleSelectAll(e.target);
    });

    $cart.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart__payment-btn--single")) {
            const itemId = e.target.getAttribute("data-item-id");
            singleOrder(itemId);
        } else if (e.target.classList.contains("cart__payment-btn--multi")) {
            multiOrder();
        } else if (e.target.classList.contains("cart__checkbox")) {
            updatePaymentInfo();
        }
    });
}

export { initCartListener, updatePaymentInfo, checkedIds };

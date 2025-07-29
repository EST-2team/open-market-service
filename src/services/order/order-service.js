import { createOrder } from "./order-api.js";
import { fetchCartList } from "../cart/cart-api.js";
import { renderOrderItem } from "../../components/order/order-item.js";
import { fetchProductById } from "../product-details/product-datails-api.js";

let orderData = [];
const urlParams = new URLSearchParams(window.location.search);
const orderType = urlParams.get("order_type");
const cartItemIds = urlParams.get("cart_item_ids");
const productId = urlParams.get("product_id");
const paramQuantity = urlParams.get("quantity");

async function getDirectOrderItems() {
    const product = await fetchProductById(productId);
    const orderItems = [
        {
            quantity: paramQuantity,
            product,
        },
    ];
    return { orderType, orderItems };
}
async function getCartOrderItems() {
    const cartData = await fetchCartList();
    const orderItems = cartData.filter((item) => cartItemIds.includes(item.id));
    return { orderType, orderItems };
}
async function renderOrderItems() {
    if (orderType === "cart_order") {
        orderData = await getCartOrderItems();
    } else if (orderType === "direct_order") {
        orderData = await getDirectOrderItems();
    }
    console.log(orderData);
    renderOrderItem(orderData);
}
function getTotalPriceWithShipping() {
    const totalPrice = orderData.orderItems.reduce(
        (acc, cur) =>
            acc + cur.quantity * cur.product.price + cur.product.shipping_fee,
        0
    );
    return totalPrice || 0;
}
function renderOrderTotalPrice() {
    const totalPriceWithShippingFee = getTotalPriceWithShipping();
    const $totalPrice = document.querySelector(".order__total-price");
    const $finalTotalPrice = document.querySelector(".order__final-amount-dd");

    $totalPrice.innerText = `${totalPriceWithShippingFee.toLocaleString()}원`;
    $finalTotalPrice.innerText = `${totalPriceWithShippingFee.toLocaleString()}원`;
}
function renderFinalProductOrderTotalPrice() {
    const totalProductPrice = orderData.orderItems.reduce(
        (acc, cur) => acc + cur.quantity * cur.product.price,
        0
    );
    const shippingFeeTotalPrice = orderData.orderItems.reduce(
        (acc, cur) => acc + cur.product.shipping_fee,
        0
    );
    const $totalProductPrice = document.querySelector(
        ".order__total-product-price"
    );
    const $totalShippingFee = document.querySelector(
        ".order__total-shipping-fee"
    );

    $totalProductPrice.innerText = totalProductPrice.toLocaleString();
    $totalShippingFee.innerText = shippingFeeTotalPrice.toLocaleString();
}

function validateInput(value, type) {
    const validationRules = {
        name: {
            regex: /^[a-zA-Z가-힣\s]+$/,
        },
        phone: {
            regex: /^[0-9]{10,11}$/,
        },
        email: {
            regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
        zipcode: {
            regex: /^[0-9]+$/,
        },
    };

    return validationRules[type].regex.test(value);
}

function validateDeliveryInfo() {
    //주문자 이름
    const $userName = document.querySelector(".order__user-name");
    const userName = validateInput($userName.value, "name");

    //주문자 휴대폰
    const $mobile1 = document.querySelector("#order__user-mobile1");
    const $mobile2 = document.querySelector("#order__user-mobile2");
    const $mobile3 = document.querySelector("#order__user-mobile3");
    const mobil123 = $mobile1.value + $mobile2.value + $mobile3.value;
    const mobile = validateInput(mobil123, "phone");

    //주문자 이메일
    const $email = document.querySelector("#email");
    const email = validateInput($email.value, "email");

    //수령인 이름
    const $recipientName = document.querySelector("#recipient-name");
    const recipientName = validateInput($recipientName.value, "name");

    //수령인휴대폰
    const $recipientMobile1 = document.querySelector(
        "#order__recipient-mobile1"
    );
    const $recipientMobile2 = document.querySelector(
        "#order__recipient-mobile2"
    );
    const $recipientMobile3 = document.querySelector(
        "#order__recipient-mobile3"
    );
    const recipientMobile123 =
        $recipientMobile1.value +
        $recipientMobile2.value +
        $recipientMobile3.value;
    const recipientMobile = validateInput(recipientMobile123, "phone");

    //수령인 배송주소 (우편번호)
    const $zipcode = document.querySelector("#zipcode");
    const zipcode = validateInput($zipcode.value, "zipcode");

    //수령인 배송주소 (주소)
    const $address = document.querySelector("#address");
    const address = $address.value.trim().length > 1;

    //수령인 배송주소 (상세)
    const $addressDetail = document.querySelector("#address-detail");
    const addressDetail = $addressDetail.value.trim().length > 1;

    return (
        userName &&
        mobile &&
        email &&
        recipientName &&
        recipientMobile &&
        zipcode &&
        address &&
        addressDetail
    );
}

function validAgree() {
    return document.querySelector('input[type="checkbox"]:checked');
}
function validPaymentMethod() {
    return document.querySelector('input[type="radio"]:checked');
}

function createOrderData() {
    const productIds = orderData.orderItems.map((item) => item.product.id);

    const $recipientName = document.querySelector("#recipient-name");
    const $recipientMobile1 = document.querySelector(
        "#order__recipient-mobile1"
    );
    const $recipientMobile2 = document.querySelector(
        "#order__recipient-mobile2"
    );
    const $recipientMobile3 = document.querySelector(
        "#order__recipient-mobile3"
    );
    const recipientMobile123 =
        $recipientMobile1.value +
        $recipientMobile2.value +
        $recipientMobile3.value;

    const $address = document.querySelector("#address");
    const $addressDetail = document.querySelector("#address-detail");
    const $deliveryMsg = document.querySelector("#delivery-msg");
    const $checkedPaymentMethod = document.querySelector(
        'input[type="radio"]:checked'
    );

    return {
        productIds,
        $recipientName,
        recipientMobile123,
        $address,
        $addressDetail,
        $deliveryMsg,
        $checkedPaymentMethod,
    };
}
function createDirectOrderData() {
    const {
        productIds,
        $recipientName,
        recipientMobile123,
        $address,
        $addressDetail,
        $deliveryMsg,
        $checkedPaymentMethod,
    } = createOrderData();
    return {
        orderType: orderType,
        product: productIds[0],
        quantity: paramQuantity,
        totalPrice: getTotalPriceWithShipping(),
        receiver: $recipientName.value,
        receiverPhoneNumber: recipientMobile123,
        address: `${$address.value} ${$addressDetail.value}`,
        deliveryMessage: $deliveryMsg.value,
        paymentMethod: $checkedPaymentMethod.value,
    };
}

function createCartOrderData() {
    const {
        productIds,
        $recipientName,
        recipientMobile123,
        $address,
        $addressDetail,
        $deliveryMsg,
        $checkedPaymentMethod,
    } = createOrderData();

    return {
        orderType: orderType,
        cartItems: productIds,
        totalPrice: getTotalPriceWithShipping(),
        receiver: $recipientName.value,
        receiverPhoneNumber: recipientMobile123,
        address: `${$address.value} ${$addressDetail.value}`,
        deliveryMessage: $deliveryMsg.value,
        paymentMethod: $checkedPaymentMethod.value,
    };
}

function daumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = ""; // 주소 변수
            let extraAddr = ""; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === "R") {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === "R") {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraAddr +=
                        extraAddr !== ""
                            ? ", " + data.buildingName
                            : data.buildingName;
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== "") {
                    extraAddr = " (" + extraAddr + ")";
                }
            }

            document.getElementById("zipcode").value = data.zonecode;
            document.getElementById("address").value = addr + extraAddr;
            document.getElementById("address-detail").focus();
        },
    }).open();
}

function initInputValidListener() {
    inputValidListener(".order__user-name", /[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s]/);
    inputValidListener("#order__user-mobile1", /[^0-9]/g);
    inputValidListener("#order__user-mobile2", /[^0-9]/g);
    inputValidListener("#order__user-mobile3", /[^0-9]/g);
    inputValidListener("#recipient-name", /[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s]/);
    inputValidListener("#order__recipient-mobile1", /[^0-9]/g);
    inputValidListener("#order__recipient-mobile2", /[^0-9]/g);
    inputValidListener("#order__recipient-mobile3", /[^0-9]/g);
}

function inputValidListener(selector, regex) {
    document.querySelector(selector).addEventListener("input", (e) => {
        const input = e.target;
        input.value = input.value.replace(regex, "");
    });
}

async function initOrderListener() {
    await renderOrderItems();
    renderOrderTotalPrice();
    renderFinalProductOrderTotalPrice();
    initInputValidListener();

    const $paymentBtn = document.querySelector(".order__payment-btn");
    const $addressSearchBtn = document.querySelector(".address-search-btn");
    const $zipcode = document.querySelector("#zipcode");

    $addressSearchBtn.addEventListener("click", () => {
        daumPostcode();
    });
    $zipcode.addEventListener("click", () => {
        if ($zipcode.value.trim().length === 0) {
            daumPostcode();
        }
    });

    document.querySelectorAll("input").forEach((input) => {
        input.addEventListener("focusout", () => {
            if (
                validateDeliveryInfo() &&
                validAgree() &&
                validPaymentMethod()
            ) {
                $paymentBtn.classList.add("active");
            } else {
                $paymentBtn.classList.remove("active");
            }
        });
    });

    const $checkableInputs = document.querySelectorAll(
        "input[type='checkbox'], input[type='radio']"
    );
    $checkableInputs.forEach((input) => {
        input.addEventListener("change", (event) => {
            if (validAgree() && validPaymentMethod()) {
                event.target.blur();
            } else {
                $paymentBtn.classList.remove("active");
            }
        });
    });

    const $orderForm = document.querySelector(".order__form");
    $orderForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const $activeBtn = document.querySelector(".order__payment-btn.active");

        if (
            validateDeliveryInfo() &&
            validAgree() &&
            validPaymentMethod() &&
            $activeBtn
        ) {
            if (orderType === "cart_order") {
                await createOrder(createCartOrderData());
            } else if (orderType === "direct_order") {
                await createOrder(createDirectOrderData());
            }
        }
    });
}

export { initOrderListener };

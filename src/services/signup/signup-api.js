export async function signup({ username, password, name, phone_number }) {
    try {
        const res = await fetch(
            "https://api.wenivops.co.kr/services/open-market/accounts/buyer/signup/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    name,
                    phone_number,
                }),
            }
        );

        if (res.ok) {
            const data = await res.json();
            return { success: true, data };
        } else if (res.status === 400) {
            // 에러 응답일 때
            const errorData = await res.json();
            return { success: false, error: errorData };
        } else {
            return {
                success: false,
                error: { unknown: ["서버 오류가 발생했습니다."] },
            };
        }
    } catch (e) {
        return {
            success: false,
            error: { network: ["네트워크 오류가 발생했습니다."] },
        };
    }
}

export const validateUsername = async (username) => {
    const url =
        "https://api.wenivops.co.kr/services/open-market/accounts/validate-username/";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });

        const data = await res.json();

        if (data.error) {
            return { valid: false, message: data.error };
        }

        return { valid: true, message: data.message };
    } catch (err) {
        throw err;
    }
};

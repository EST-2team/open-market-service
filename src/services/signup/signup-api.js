let signup = async ({ username, password, name, phone_number }) => {
    try {
        const url =
            "https://api.wenivops.co.kr/services/open-market/accounts/buyer/signup/";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, name, phone_number }),
        };
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
            throw new Error("회원가입 실패");
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

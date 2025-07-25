const validateUsername = async (username) => {
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

export { validateUsername };

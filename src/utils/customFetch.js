import { getValidAccessToken } from "../services/login/login-token.js";

export async function customFetch(url, options, retryCount = 0) {
    try {
        const res = await fetch(url, options);

        if (
            options.headers?.Authorization &&
            res.status === 401 &&
            retryCount < 1 &&
            retryCount < 3
        ) {
            const token = await getValidAccessToken();
            if (token) {
                const newOptions = {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${token}`,
                    },
                };
                return await customFetch(url, newOptions, retryCount + 1);
            }
        }
        return res;
    } catch (error) {
        console.error(error);
        throw new Error("API 통신 중 오류 발생");
    }
}

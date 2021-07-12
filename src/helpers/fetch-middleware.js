const baseUrl = process.env.REACT_APP_API_URL;

const fetchMiddleware = (api, payload = {}, method = "GET") => {
    const url = `${baseUrl}/${api}`;

    if (method === "GET") {
        return fetch(url);
    }

    return fetch(url, {
        method,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    });
};

const fetchMiddlewareToken = (api, payload = {}, method = "GET") => {
    const url = `${baseUrl}/${api}`;
    const jwt = localStorage.getItem("token") || "";

    if (method === "GET") {
        return fetch(url, {
            headers: {
                "x-jwt": jwt,
            },
        });
    }

    return fetch(url, {
        method,
        headers: {
            "Content-type": "application/json",
            "x-jwt": jwt,
        },
        body: JSON.stringify(payload),
    });
};

export { fetchMiddleware, fetchMiddlewareToken };

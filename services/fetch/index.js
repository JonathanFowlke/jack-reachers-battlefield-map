
export const fetchJson = (path, options = undefined) => {
    let url = path.startsWith("/") ? process.env.NEXT_PUBLIC_BASE_PATH + path : path;
    return fetch(url, options).then((res) => res.json());
};

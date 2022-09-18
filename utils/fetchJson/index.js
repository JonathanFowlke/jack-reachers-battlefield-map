const fetchJson = (path) => {
    let url = path.startsWith("/") ? process.env.NEXT_PUBLIC_BASE_PATH + path : path;
    return fetch(url).then((res) => res.json());
};

export default fetchJson;

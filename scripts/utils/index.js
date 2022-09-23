const checksum = (file) => {
    let contents = JSON.stringify(JSON.parse(file));
    return hashCode(contents);
};

const hashCode = (value) => {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
        let char = value.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }

    return hash;
};

module.exports = { checksum, hashCode };

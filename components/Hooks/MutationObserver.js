import React from "react";

const defaultOptions = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
};

const useMutationObserver = (ref, callback, options = defaultOptions) => {
    React.useEffect(() => {
        if (ref.current) {
            const observer = new MutationObserver(callback);
            observer.observe(ref.current, options);
            return () => observer.disconnect();
        }
    }, [ref, callback, options]);
};

export default useMutationObserver;

export { checksum, hashCode } from "../../scripts/utils";

export const isUndefined = (obj) => obj === void 0;

export const isDefined = (obj) => !isUndefined(obj);

export const removeUndefined = (obj) => {
    Object.keys(obj).forEach((key) => isUndefined(obj[key]) && delete obj[key]);
    return obj;
};

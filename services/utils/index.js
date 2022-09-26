export { checksum, hashCode } from "../../scripts/utils";

export const isUndefined = (obj) => obj === void 0;

export const isDefined = (obj) => !isUndefined(obj);

export const isType = (obj, type) => typeof obj === type;

export const isBoolean = (obj) => obj === true || obj === false;

export const isString = (obj) => isType(obj, "string");

export const isNumber = (obj) => isType(obj, "number");

export const isArray = (obj) => Array.isArray(obj);

export const isObject = (obj) => obj === Object(obj);

export const isFunction = (obj) => isType(obj, "function");

export const isEmpty = (value) => isUndefined(value) || value === null || value === "" || (isNumber(value) && isNaN(value));

export const isNotEmpty = (value) => !isEmpty(value);

export const removeUndefined = (obj) => {
    Object.keys(obj).forEach((key) => isUndefined(obj[key]) && delete obj[key]);
    return obj;
};

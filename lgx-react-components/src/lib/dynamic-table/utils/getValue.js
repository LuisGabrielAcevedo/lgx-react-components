import get from "lodash/get";

const getValueFn = (item, key) => get(item, key, "--");

export default getValueFn;

import getValueFn from "./getValue";

const formatTextFn = (item, key) => {
  if (key.indexOf("/a/") !== -1) {
    return getValueFn(item, key.split("/a/")[0]) + key.split("/a/")[1];
  } else if (key.indexOf("/b/") !== -1) {
    return key.split("/a/")[1] + getValueFn(item, key.split("/b/")[1]);
  } else if (key.indexOf(",") !== -1) {
    let value = "";
    key.split(",").forEach(keyItem => {
      value += getValueFn(item, keyItem) + " ";
    });
    return value;
  } else {
    return getValueFn(item, key);
  }
};

export default formatTextFn;

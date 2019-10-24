import React from "react";
import formatTextFn from "../../utils/formatText";
import PropTypes from "prop-types";

function TextComponent({ item, header }) {
  const formatText = () => {
    return formatTextFn(item, header.key);
  };

  return <div>{formatText()}</div>;
}

TextComponent.propTypes = {
  item: PropTypes.object,
  header: PropTypes.object
};

export default TextComponent;

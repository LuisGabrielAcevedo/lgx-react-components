import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

function ButtonComponent({ button, item }) {
  const actions = () => {
    if (button.event) button.event(item);
  };
  return (
    <Tooltip title={button.tooltip || ""}>
      <IconButton color="primary" size="small" onClick={actions}>
        <Icon>{button.icon}</Icon>
      </IconButton>
    </Tooltip>
  );
}

ButtonComponent.propTypes = {
  button: PropTypes.object,
  item: PropTypes.object
};

export default ButtonComponent;

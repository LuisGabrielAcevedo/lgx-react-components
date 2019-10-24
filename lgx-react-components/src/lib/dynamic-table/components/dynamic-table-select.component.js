import React, { Component } from "react";
import {
  DynamicTableTextComponent,
  DynamicTableImageComponent
} from "../constants/index";
import ImageComponent from "./components/dynamic-table-image.component";
import TextComponent from "./components/dynamic-table-text.component";
import PropTypes from "prop-types";

class DynamicTableSelectComponent extends Component {
  components(currentComponent) {
    const components = {
      [DynamicTableTextComponent]: TextComponent,
      [DynamicTableImageComponent]: ImageComponent
    };
    return components[currentComponent];
  }

  render() {
    const { header, item } = this.props;
    const Component = this.components(header.component);
    return <Component item={item} header={header} />;
  }
}

DynamicTableSelectComponent.propTypes = {
  header: PropTypes.object,
  item: PropTypes.object
};

export default DynamicTableSelectComponent;

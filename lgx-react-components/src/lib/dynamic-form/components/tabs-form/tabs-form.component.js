import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RowFormComponent from "../row-form/form-row.component";

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index ? <div>{children}</div> : null}</div>;
}

class TabsFormComponent extends Component {
  state = {
    value: 0
  };

  changeValue(value) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { groups } = this.props;
    const tabs = groups.map((group, i) => (
      <Tab key={i} label={group.name} onClick={() => this.changeValue(i)} />
    ));
    const panels = groups.map((group, i) => (
      <TabPanel key={i} value={value} index={i}>
        {group.fields.map((fields, j) => (
          <RowFormComponent
            key={j}
            fields={fields}
            form={this.props.form}
            materialData={this.props.materialData}
            updateModel={this.props.updateModel}
          />
        ))}
      </TabPanel>
    ));
    return (
      <div>
        <AppBar position="static" color="primary">
          <Tabs scrollButtons="auto" value={value}>
            {tabs}
          </Tabs>
        </AppBar>
        {panels}
      </div>
    );
  }
}

TabsFormComponent.propTypes = {
  groups: PropTypes.array,
  materialData: PropTypes.object,
  form: PropTypes.object,
  updateModel: PropTypes.func
};

export default TabsFormComponent;

import React from "react";
import PropTypes from "prop-types";
import "./dynamic-table.component.css";
import DynamicTableLoadingComponent from "./components/dynamic-table-loading.component";
import DynamicTablePaginationComponent from "./components/dynamic-table-pagination.component";
import DynamicTableDataComponent from "./components/dynamic-table-data.component";
import DynamicTableMessageComponent from "./components/dynamic-table-message.component";
import DynamicTableHeaderComponent from "./components/dynamic-table-header.component";
import { DynamicTableRectLoading } from "./constants/index";

class DynamicTableComponent extends React.Component {
  tableData;
  tableChanges = {};

  componentDidMount() {}

  state = {
    openRow: [],
    itemsSelected: [],
    checkedAll: false,
    activeSort: "",
    modalSelected: {
      row: 0,
      number: 1
    },
    expandComponentSelected: {
      row: 0,
      component: ""
    }
  };

  changePagination(pagination) {
    this.props.dynamicTableChanges({
      ...this.tableChanges,
      pagination
    });
  }

  render() {
    const {
      headers,
      loading,
      data,
      loadingType,
      pagination,
      noDataMessage,
      rowActions
    } = this.props;

    const loadingComponent = loading ? (
      <DynamicTableLoadingComponent loadingType={loadingType} />
    ) : null;

    const paginationComponent = pagination ? (
      <DynamicTablePaginationComponent
        pagination={pagination}
        changePagination={currentPagination =>
          this.changePagination(currentPagination)
        }
      />
    ) : null;

    const dataComponent =
      data.length && !loading ? (
        <DynamicTableDataComponent
          ref={tableData => (this.tableData = tableData)}
          data={data}
          headers={headers}
          rowActions={rowActions}
        />
      ) : null;

    const defaultMessage =
      !data.length && !loading ? (
        <DynamicTableMessageComponent message={noDataMessage} />
      ) : null;

    return (
      <div className="table material">
        <div className="table-content">
          <div>
            {/* headers */}
            <DynamicTableHeaderComponent
              headers={headers}
              rowActions={rowActions}
            />
            {/* loading */}
            {loadingComponent}
            {/* default message */}
            {defaultMessage}
            {/*  data */}
            {dataComponent}
            {/* pagination */}
            {paginationComponent}
          </div>
        </div>
      </div>
    );
  }
}

DynamicTableComponent.propTypes = {
  headers: PropTypes.array,
  loading: PropTypes.bool,
  data: PropTypes.array,
  loadingType: PropTypes.string,
  index: PropTypes.bool,
  multiSelect: PropTypes.bool,
  rowActions: PropTypes.array,
  pagination: PropTypes.object,
  noDataMessage: PropTypes.string,
  dynamicTableChanges: PropTypes.func
};

DynamicTableComponent.defaultProps = {
  headers: [],
  loading: false,
  data: [],
  loadingType: DynamicTableRectLoading,
  noDataMessage: "No data available",
  rowActions: []
};

export default DynamicTableComponent;

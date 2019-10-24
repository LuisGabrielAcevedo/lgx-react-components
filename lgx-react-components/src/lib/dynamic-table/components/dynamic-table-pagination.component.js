import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import TablePagination from "@material-ui/core/TablePagination";

function DynamicTablePaginationComponent({ pagination, changePagination }) {
  const handleChangePage = (event, page) => {
    const currentPagination = {
      currentPage: page + 1,
      itemsPerPage: pagination.itemsPerPage
    };
    changePagination(currentPagination);
  };

  const handleChangeRowsPerPage = event => {
    const currentPagination = {
      currentPage: 1,
      itemsPerPage: event.target.value
    };
    changePagination(currentPagination);
  };

  return (
    <Grid container direction="row" alignItems="center" justify="center">
      <Grid item>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 20, 50, 100]}
          component="div"
          count={pagination.totalItems}
          rowsPerPage={pagination.itemsPerPage}
          page={pagination.currentPage - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={"items per page"}
        />
      </Grid>
    </Grid>
  );
}

DynamicTablePaginationComponent.propTypes = {
  pagination: PropTypes.object,
  changePagination: PropTypes.func
};

export default DynamicTablePaginationComponent;

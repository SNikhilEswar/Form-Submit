import React, { useEffect, useRef } from "react";
import DataTables from "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";

class ReactDataTables extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    const { ...props } = this.props;

    if (this.tableRef.current) {
      this.dataTable = new DataTables(this.tableRef.current, {
        ...props,
      });
    }
  }
  

  componentWillUnmount() {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  render() {
    return <table ref={this.tableRef}></table>;
  }
}
export default ReactDataTables;

import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import { getAllOrders, deleteOrder, clearErrors } from '../../actions/orderAction';

const OrderList = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, orders } = useSelector(state => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector(state => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors);
    }

    if(isDeleted){
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({type: DELETE_ORDER_RESET});
    }

    dispatch(getAllOrders());

  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.api.getCellValue(params.id, "status") === "Delivered"
          ? "greenColor" : "redColor";
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.api.getCellValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.api.getCellValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </Fragment>
        )
      }
    }
  ];

  const rows = [];

  orders &&
    orders.forEach(item => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice
      });
    });

  return (
    <Fragment>
      <MetaData title={`All Orders - Admin`} />

      <div className='dashboard'>
        <Sidebar />
        <div className='productListContainer'>
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                }
              }
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            className='productListTable'
            autoHeight
          />

        </div>
      </div>

    </Fragment>
  )
}

export default OrderList;